CREATE OR REPLACE FUNCTION account."account.add"(
  "@accountNumber" CHARACTER varying(25),
  "@actorId" CHARACTER varying(25),
  "@isDefault" boolean,
  "@isSignatory" boolean
) RETURNS TABLE(
  "accountNumber" CHARACTER varying(25),
  "actorId" CHARACTER varying(25),
  "isDefault" boolean,
  "isSignatory" boolean,
  "isSingleResult" boolean
)
AS
$body$
  WITH
  u AS (
    UPDATE account.account a
    SET "isDefault" = false
    WHERE "@isDefault" = true AND a."actorId" = "@actorId"
    RETURNING *
  ),
  a AS (
    INSERT INTO account.account ("accountNumber", "actorId", "isDefault", "isSignatory")
    VALUES ("@accountNumber", "@actorId", COALESCE("@isDefault", false), COALESCE("@isSignatory", false))
    RETURNING *
  )
  SELECT
    *,
    true as "isSingleResult"
  FROM a
$body$
LANGUAGE SQL