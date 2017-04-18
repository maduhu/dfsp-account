CREATE TABLE account."role"
(
  "roleId" serial NOT NULL,
  "name" character varying(25) NOT NULL,
  "description" character varying(100) NOT NULL,
  CONSTRAINT "pkAccountRole" PRIMARY KEY ("roleId"),
  CONSTRAINT "ukAccountRoleName" UNIQUE ("name")
)
