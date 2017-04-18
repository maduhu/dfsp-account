CREATE OR REPLACE FUNCTION account."actorAccount.remove"(
  "@actorAccountId" bigint
) RETURNS TABLE(
  "accountId" bigint,
  "isSingleResult" boolean
)
AS
$body$
  DECLARE "@accountId" bigint;
  BEGIN
    WITH a as (
      DELETE FROM
        account."actorAccount"
      WHERE
        "actorAccountId" = "@actorAccountId"
      RETURNING *
    )
    SELECT
      a."accountId"
    INTO
      "@accountId"
    FROM
      a;

    IF ("@accountId" IS NULL) THEN
      RAISE EXCEPTION 'account.accountNotFound';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM account."actorAccount" aa WHERE aa."accountId" = "@accountId") THEN
      DELETE FROM
        account."account" a
      WHERE
        a."accountId" = "@accountId";
    END IF;

    RETURN QUERY
    SELECT
      "@accountId" AS "accountId",
      true AS "isSingleResult";
  END
$body$
LANGUAGE plpgsql;
