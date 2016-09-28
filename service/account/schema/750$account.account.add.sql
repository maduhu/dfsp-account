CREATE OR REPLACE FUNCTION account."account.add"(
  "@accountNumber" CHARACTER varying(25),
  "@actorId" CHARACTER varying(25)
) RETURNS TABLE(
  "accountNumber" CHARACTER varying(25),
  "actorId" CHARACTER varying(25),
  "isSingleResult" boolean
)
AS
$body$
  WITH a as (
    INSERT INTO account.account ("accountNumber", "actorId")
    VALUES ("@accountNumber", "@actorId")
    RETURNING *
  )
  SELECT
    *,
    true as "isSingleResult"
  FROM a
$body$
LANGUAGE SQL