CREATE OR REPLACE FUNCTION account."actorAccount.get"(
  "@actorAccountId" bigint
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
    RETURN QUERY
      SELECT
        aa."actorAccountId" AS "actorAccountId",
        aa."actorId" AS "actorId",
        aa."accountId" AS "accountId",
        aa."isDefault" AS "isDefault",
        aa."isSignatory" AS "isSignatory",
        a."accountNumber" AS "accountNumber",
        array_agg(p."name") AS "permissions",
        true AS "isSingleResult"
      FROM account."actorAccount" aa
      JOIN account."account" a ON aa."accountId" = a."accountId"
      JOIN account."actorAccountPermission" aap ON aap."actorAccountId" = aa."actorAccountId"
      JOIN account."permission" p ON p."permissionId" = aap."permissionId"
      WHERE aa."actorAccountId" = "@actorAccountId"
      GROUP BY aa."actorAccountId", aa."actorId", aa."accountId", aa."isDefault", aa."isSignatory", a."accountNumber";

      IF NOT FOUND THEN
        RAISE EXCEPTION 'account.accountNotFound';
      END IF;
  END
$body$
LANGUAGE plpgsql;
