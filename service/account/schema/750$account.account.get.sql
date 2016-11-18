CREATE OR REPLACE FUNCTION account."account.get"(
  "@accountNumber" varchar(25)
) RETURNS TABLE(
  "accountNumber" varchar(25),
  "isDefault" boolean,
  "actorId" varchar(25),
  "isSingleResult" boolean
)
AS
$body$
  DECLARE
    "@isDefault" boolean;
    "@actorId" varchar(25);
  BEGIN
    SELECT
        a."isDefault",
        a."actorId"
    INTO
        "@isDefault",
        "@actorId"
    FROM
      account.account AS a
    WHERE
      a."accountNumber" = "@accountNumber";

    IF "@actorId" IS NULL THEN
      RAISE EXCEPTION 'account.accountNotFound';
    END IF;
    RETURN QUERY
      SELECT
        "@accountNumber" AS "accountNumber",
        "@isDefault" AS "isDefault",
        "@actorId" AS "actorId",
        true AS "isSingleResult";
  END
$body$
LANGUAGE plpgsql;
