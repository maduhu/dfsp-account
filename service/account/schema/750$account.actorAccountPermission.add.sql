CREATE OR REPLACE FUNCTION account."actorAccountPermission.add"(
  "@actorAccountId" bigint,
  "@permissions" varchar[]
) RETURNS TABLE(
  "actorAccountId" bigint,
  "permissions" varchar[],
  "isSingleResult" boolean
)
AS
$body$
  BEGIN
    INSERT INTO account."actorAccountPermission" ("actorAccountId", "permissionId")
    SELECT "@actorAccountId", p."permissionId"
    FROM account."permission" p WHERE p.name = ANY("@permissions")
    ON CONFLICT DO NOTHING;

    RETURN QUERY SELECT * FROM account."actorAccountPermission.get" ("@actorAccountId");

  END
$body$
LANGUAGE plpgsql;
