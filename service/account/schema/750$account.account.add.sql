CREATE OR REPLACE FUNCTION account."account.add"(
  "@accountNumber" CHARACTER varying(25),
  "@actorId" CHARACTER varying(25),
  "@isDefault" boolean
) RETURNS TABLE(
  "accountNumber" CHARACTER varying(25),
  "actorId" CHARACTER varying(25),
  "isDefault" boolean,
  "isSingleResult" boolean
)
AS
$body$
  WITH a as (
    INSERT INTO account.account ("accountNumber", "actorId", "isDefault")
    VALUES ("@accountNumber", "@actorId", COALESCE("@isDefault", false))
    RETURNING *
  )
  SELECT
    *,
    true as "isSingleResult"
  FROM a
$body$
LANGUAGE SQL