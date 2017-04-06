CREATE TABLE account."permission"
(
  "permissionId" serial NOT NULL,
  "name" character varying(25) NOT NULL,
  "description" character varying(100) NOT NULL,
  CONSTRAINT "pkAccountPermission" PRIMARY KEY ("permissionId"),
  CONSTRAINT "ukAccountPermissionName" UNIQUE ("name")
)
