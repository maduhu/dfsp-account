CREATE OR REPLACE FUNCTION account."actorAccountPermission.remove"(
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
    DELETE FROM
      account."actorAccountPermission" aap
    WHERE
      aap."actorAccountId" = "@actorAccountId"
        AND
      aap."permissionId" IN (SELECT p."permissionId" FROM account."permission" p WHERE p.name = ANY("@permissions"));

    RETURN QUERY SELECT * FROM account."actorAccountPermission.get" ("@actorAccountId");

  END
$body$
LANGUAGE plpgsql;
