CREATE OR REPLACE FUNCTION account."actorAccount.edit"(
  "@actorAccountId" bigint,
  "@accountId" bigint,
  "@actorId" CHARACTER varying(25),
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
BEGIN
  IF ("@actorAccountId" IS NULL) THEN
    IF ("@accountId" IS NULL OR "@actorId" IS NULL) THEN
      RAISE EXCEPTION 'account.accountNotFound';
    END IF;
    SELECT
      aa."acctorAccountId"
    INTO
      "@actorAccountId"
    FROM
      account."actorAccount" aa
    WHERE
      aa."accountId" = "@accountId" AND aa."actorId" = "@actorId";
  END IF;

  IF "@isDefault" = true THEN
    UPDATE
      account."actorAccount" AS aa
    SET
      "isDefault" = false
    WHERE
      aa."actorId" = (SELECT aacc."actorId" FROM account."actorAccount" aacc WHERE aacc."actorAccountId" = "@actorAccountId");
  END IF;

  UPDATE account."actorAccount" aa
  SET
    "isDefault" = "@isDefault",
    "isSignatory" = COALESCE("@isSignatory", aa."isSignatory")
  WHERE
      aa."actorAccountId" = "@actorAccountId";

  RETURN QUERY SELECT * FROM account."actorAccount.get" ("@actorAccountId");
END;
$body$
LANGUAGE plpgsql;
