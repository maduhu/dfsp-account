CREATE TABLE account."actorAccount"
(
  "actorAccountId" bigserial NOT NULL,
  "actorId" character varying(25) NOT NULL,
  "accountId" bigint NOT NULL,
  "isDefault" boolean DEFAULT false,
  "isSignatory" boolean DEFAULT false,
  CONSTRAINT "pkAccountActorAccount" PRIMARY KEY ("actorAccountId"),
  CONSTRAINT "fkAccountAccountId" FOREIGN KEY ("accountId") REFERENCES account."account"("accountId"),
  CONSTRAINT "ukAccountAccountIdActorId" UNIQUE ("actorId", "accountId")
)
