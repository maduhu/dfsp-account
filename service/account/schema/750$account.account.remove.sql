CREATE OR REPLACE FUNCTION account."account.remove"(
  "@accountId" CHARACTER varying(25)
) RETURNS TABLE(
  "accountId" CHARACTER varying(25),
  "isSingleResult" boolean
)
AS
$body$
  WITH a as (
    DELETE FROM account.account
    WHERE "accountId" = "@accountId"
    RETURNING *
  )
  SELECT
    a."accountId",
	  true AS "isSingleResult"
  FROM a
$body$
LANGUAGE SQL