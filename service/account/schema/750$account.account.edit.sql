CREATE OR REPLACE FUNCTION account."account.edit"(
  "@accountNumber" CHARACTER varying(25),
  "@actorId" CHARACTER varying(25),
  "@isDefault" boolean,
  "@isSignatory" boolean
) RETURNS TABLE(
  "accountNumber" varchar(25),
  "isDefault" boolean,
  "actorId" varchar(25),
  "isSignatory" boolean,
  "isSingleResult" boolean
)
AS
$body$
BEGIN
  IF "@actorId" IS NULL THEN
    RAISE EXCEPTION 'account.accountNotFound';
  END IF;
  IF "@accountNumber" IS NULL THEN
    RAISE EXCEPTION 'account.accountNotFound';
  END IF;

  IF "@isDefault" = true THEN
    UPDATE
      account."account" AS a
    SET
      "isDefault" = false
    WHERE
      a."actorId" = "@actorId";
  END IF;
    
  UPDATE
    account."account" AS a
  SET
    "isDefault" = "@isDefault",
    "accountNumber" = "@accountNumber",
    "isSignatory" = COALESCE("@isSignatory", a."isSignatory")
  WHERE
    a."actorId" = "@actorId"
    AND a."accountNumber" = "@accountNumber";

  RETURN QUERY
    SELECT * FROM account."account.get"("@accountNumber", "@actorId");
END;
$body$
LANGUAGE plpgsql;
