CREATE OR REPLACE FUNCTION account."account.get"(
  "@accountNumber" varchar(25),
  "@actorId" varchar(25)
) RETURNS TABLE(
  "accountNumber" varchar(25),
  "isDefault" boolean,
  "actorId" varchar(25),
  "isSignatory" boolean,
  "isSingleResult" boolean
)
AS
$body$
  DECLARE
    "@isDefault" boolean;
    "@actorIdOut" varchar(25);
    "@isSignatory" boolean;
  BEGIN
    SELECT
        a."isDefault",
        a."actorId",
        a."isSignatory"
    INTO
        "@isDefault",
        "@actorIdOut",
        "@isSignatory"
    FROM
      account.account AS a
    WHERE
      a."accountNumber" = "@accountNumber" and ("@actorId" IS NULL OR a."actorId" = "@actorId");

    IF "@isDefault" IS NULL THEN
      RAISE EXCEPTION 'account.accountNotFound';
    END IF;
    RETURN QUERY
      SELECT
        "@accountNumber" AS "accountNumber",
        "@isDefault" AS "isDefault",
        "@actorIdOut" AS "actorId",
        "@isSignatory" AS "isSignatory",
        true AS "isSingleResult";
  END
$body$
LANGUAGE plpgsql;
