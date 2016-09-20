CREATE OR REPLACE FUNCTION account."account.add"(
  "@accountId" CHARACTER varying(25),
  "@actorId" CHARACTER varying(25)
) RETURNS TABLE(
  "accountId" CHARACTER varying(25),
  "actorId" CHARACTER varying(25)
)
AS
$body$
  WITH x as (
    INSERT INTO account.account ("accountId", "actorId")
    VALUES ("@accountId", "@actorId")
    RETURNING *
  )
  SELECT
    *
  FROM x
$body$
LANGUAGE SQL