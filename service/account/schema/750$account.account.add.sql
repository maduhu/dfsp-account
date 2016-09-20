CREATE OR REPLACE FUNCTION account."account.add"(
  "@accountId" CHARACTER varying(25),
  "@actorId" CHARACTER varying(25)
) RETURNS TABLE(
  "accountId" CHARACTER varying(25),
  "actorId" CHARACTER varying(25),
  "isSingleResult" boolean
)
AS
$body$
  WITH a as (
    INSERT INTO account.account ("accountId", "actorId")
    VALUES ("@accountId", "@actorId")
    RETURNING *
  )
  SELECT
    *,
    true as "isSingleResult"
  FROM a
$body$
LANGUAGE SQL