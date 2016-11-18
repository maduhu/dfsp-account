CREATE OR REPLACE FUNCTION account."account.fetch"(
  "@accountNumber" varchar(25),
  "@actorId" varchar(25),
  "@isDefault" boolean
) RETURNS TABLE(
  "accountNumber" varchar(25),
  "actorId" varchar(25),
  "isDefault" boolean
)
AS
$body$
  SELECT
  	*
  FROM account.account AS a
  WHERE
    ("@accountNumber" IS NULL OR a."accountNumber" = "@accountNumber")
    AND
    ("@actorId" is NULL OR a."actorId" = "@actorId")
    AND
    ("@isDefault" is NULL OR a."isDefault" = "@isDefault")
$body$
LANGUAGE SQL