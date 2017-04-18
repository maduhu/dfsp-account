CREATE TABLE account."rolePermission"
(
  "rolePermissionId" bigserial NOT NULL,
  "roleId" integer NOT NULL,
  "permissionId" integer NOT NULL,
  CONSTRAINT "pkAccountRolePermission" PRIMARY KEY ("rolePermissionId"),
  CONSTRAINT "ukAccountRoleIdPermissionId" UNIQUE ("roleId", "permissionId")
)
