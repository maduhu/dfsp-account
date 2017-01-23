CREATE TABLE account."account"
(
  "accountNumber" character varying(25) NOT NULL,
  "actorId" character varying(25) NOT NULL,
  "isDefault" boolean DEFAULT false,
  "isSignatory" boolean DEFAULT false,
  CONSTRAINT "pkaccountNumber" PRIMARY KEY ("accountNumber", "actorId")
)
