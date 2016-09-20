CREATE OR REPLACE FUNCTION account."account.get"(
  "@accountId" CHARACTER varying,
  "@actorId" CHARACTER varying
) RETURNS TABLE(
  "accountId" CHARACTER varying(25),
  "actorId" CHARACTER varying(25)
)
AS
$body$
  SELECT *
  FROM account.account AS a
  WHERE
  	("@accountId" IS NULL OR a."accountId" = "@accountId")
	  AND
	("@actorId" is NULL or a."actorId" = "@actorId")
$body$
LANGUAGE SQL