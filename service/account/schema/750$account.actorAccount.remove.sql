CREATE OR REPLACE FUNCTION account."actorAccount.remove"(
  "@actorAccountId" bigint
) RETURNS TABLE(
  "accountId" bigint,
  "isSingleResult" boolean
)
AS
$body$
  WITH a as (
    DELETE
    FROM
      account."actorAccount"
    WHERE
      "actorAccountId" = "@actorAccountId"
    RETURNING *
  )
  SELECT
    a."accountId",
	  true AS "isSingleResult"
  FROM a
$body$
LANGUAGE SQL
