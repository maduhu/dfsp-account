CREATE TABLE account."actorAccountPermission"
(
  "actorAccountPermissionId" bigserial NOT NULL,
  "actorAccountId" bigint NOT NULL,
  "permissionId" int NOT NULL,
  CONSTRAINT "pkAccountActorAccountPermission" PRIMARY KEY ("actorAccountPermissionId"),
  CONSTRAINT "ukAccountActorAccountIdPermissionId" UNIQUE ("actorAccountId", "permissionId")
)
