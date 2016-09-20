CREATE OR REPLACE FUNCTION account."account.remove"(
  "@accountId" CHARACTER varying(25)
) RETURNS TABLE(
  "accountId" CHARACTER varying(25)
)
AS
$body$
  WITH a as (
    DELETE FROM account.account
    WHERE "accountId" = "@accountId"
    RETURNING *
  )
  SELECT
    a."accountId"
  FROM a
$body$
LANGUAGE SQL