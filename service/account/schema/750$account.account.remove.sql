CREATE OR REPLACE FUNCTION account."account.remove"(
  "@accountNumber" CHARACTER varying(25),
  "@actorId" CHARACTER varying(25)
) RETURNS TABLE(
  "accountNumber" CHARACTER varying(25),
  "isSingleResult" boolean
)
AS
$body$
  WITH a as (
    DELETE FROM account.account
    WHERE "accountNumber" = "@accountNumber" AND "actorId" = "@actorId"
    RETURNING *
  )
  SELECT
    a."accountNumber",
	  true AS "isSingleResult"
  FROM a
$body$
LANGUAGE SQL