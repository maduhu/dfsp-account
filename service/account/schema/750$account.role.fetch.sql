CREATE OR REPLACE FUNCTION account."role.fetch"(

) RETURNS TABLE (
  "roleId" INTEGER,
  "name" VARCHAR(10),
  "description" VARCHAR(10)
)
AS
$body$
BEGIN
  RETURN QUERY
  SELECT
    r."roleId",
    r."name",
    r."description"
  FROM
     account."role" r;
END;
$body$
LANGUAGE 'plpgsql';
