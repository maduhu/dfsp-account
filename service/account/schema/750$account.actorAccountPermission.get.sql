CREATE OR REPLACE FUNCTION account."actorAccountPermission.get"(
  "@actorAccountId" bigint
) RETURNS TABLE(
  "actorAccountId" bigint,
  "permissions" varchar[],
  "isSingleResult" boolean
)
AS
$body$
  SELECT
    aa."actorAccountId" AS "actorAccountId",
    array_agg(p."name") AS "permissions",
    true AS "isSingleResult"
  FROM account."actorAccount" aa
  JOIN account."actorAccountPermission" aap ON aap."actorAccountId" = aa."actorAccountId"
  JOIN account."permission" p ON p."permissionId" = aap."permissionId"
  WHERE aa."actorAccountId" = "@actorAccountId"
  GROUP BY aa."actorAccountId";
$body$
LANGUAGE SQL;
