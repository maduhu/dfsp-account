CREATE OR REPLACE FUNCTION account."actorAccount.add"(
  "@accountId" bigint,
  "@accountNumber" CHARACTER varying(25),
  "@actorId" CHARACTER varying(25),
  "@roleName" CHARACTER varying(25),
  "@isDefault" boolean,
  "@isSignatory" boolean
) RETURNS TABLE(
  -- actorAccount
  "actorAccountId" bigint,
  "actorId" varchar(25),
  "accountId" bigint,
  "isDefault" boolean,
  "isSignatory" boolean,
  --account
  "accountNumber" varchar(25),
  --permissions
  "permissions" varchar[],
  --single result
  "isSingleResult" boolean
)
AS
$body$
  DECLARE
    "@actorAccountId" bigint;
  BEGIN
    IF ("@accountId" IS NULL) THEN
      SELECT
        a."accountId"
      INTO
        "@accountId"
      FROM
        account."account" a WHERE a."accountNumber" = "@accountNumber";

      IF ("@accountId" IS NULL) THEN
        with a AS (
          INSERT INTO account."account" ("accountNumber")
          VALUES ("@accountNumber")
          RETURNING *
        )
        SELECT
          a."accountId"
        INTO
          "@accountId"
        FROM
          a;
      END IF;
    END IF;

    IF ("@isDefault" = true) THEN
      UPDATE
        account."actorAccount" a
      SET
        "isDefault" = false
      WHERE a."actorId" = "@actorId";
    END IF;

    with aa AS (
      INSERT INTO account."actorAccount" (
        "actorId",
        "accountId",
        "isDefault",
        "isSignatory"
      )
      VALUES (
        "@actorId",
        "@accountId",
        COALESCE("@isDefault", false),
        COALESCE("@isSignatory", false)
      )
      RETURNING *
    )
    SELECT
      aa."actorAccountId"
    INTO
      "@actorAccountId"
    FROM
      aa;

    INSERT INTO account."actorAccountPermission" (
      "actorAccountId",
      "permissionId"
    )
    SELECT
      "@actorAccountId",
      p."permissionId"
    FROM
      account."permission" AS p
    JOIN
      account."rolePermission" AS rp ON p."permissionId" = rp."permissionId"
    JOIN
      account."role" AS r ON r."roleId" = rp."roleId"
    WHERE
      r."name" = COALESCE("@roleName", 'customer');

    RETURN QUERY SELECT * from account."actorAccount.get" ("@actorAccountId");
  END
$body$
LANGUAGE plpgsql;