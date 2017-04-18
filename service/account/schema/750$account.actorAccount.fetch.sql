CREATE OR REPLACE FUNCTION account."actorAccount.fetch"(
  "@accountId" bigint,
  "@actorId" varchar(25),
  "@accountNumber" varchar(25),
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
  "permissions" varchar[]
)
AS
$body$
   SELECT
      aa."actorAccountId" AS "actorAccountId",
      aa."actorId" AS "actorId",
      aa."accountId" AS "accountId",
      aa."isDefault" AS "isDefault",
      aa."isSignatory" AS "isSignatory",
      a."accountNumber" AS "accountNumber",
      array_agg(p."name") AS "permissions"
    FROM account."actorAccount" aa
    JOIN account."account" a ON aa."accountId" = a."accountId"
    JOIN account."actorAccountPermission" aap ON aap."actorAccountId" = aa."actorAccountId"
    JOIN account."permission" p ON p."permissionId" = aap."permissionId"
    WHERE
      ("@accountId" IS NULL OR aa."accountId" = "@accountId")
        AND
      ("@actorId" is NULL OR aa."actorId" = "@actorId")
        AND
      ("@accountNumber" is NULL OR a."accountNumber" = "@accountNumber")
        AND
      ("@isDefault" is NULL OR aa."isDefault" = "@isDefault")
        AND
      ("@isSignatory" is NULL OR aa."isSignatory" = "@isSignatory")
    GROUP BY aa."actorAccountId", aa."actorId", aa."accountId", aa."isDefault", aa."isSignatory", a."accountNumber";

$body$
LANGUAGE SQL