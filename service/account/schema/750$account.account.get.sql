CREATE OR REPLACE FUNCTION account."account.get"(
  "@accountNumber" CHARACTER varying,
  "@actorId" CHARACTER varying
) RETURNS TABLE(
  "accountNumber" CHARACTER varying(25),
  "actorId" CHARACTER varying(25),
  "isSingleResult" boolean
)
AS
$body$
  SELECT
  	*,
	true AS "isSingleResult"
  FROM account.account AS a
  WHERE
  	("@accountNumber" IS NULL OR a."accountNumber" = "@accountNumber")
	  AND
	("@actorId" is NULL or a."actorId" = "@actorId")
$body$
LANGUAGE SQL