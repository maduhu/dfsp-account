CREATE TABLE account."account"
(
  "accountId" bigserial NOT NULL,
  "accountNumber" character varying(25) NOT NULL,
  CONSTRAINT "pkAccountAccount" PRIMARY KEY ("accountId"),
  CONSTRAINT "ukAccountAccountNumber" UNIQUE ("accountNumber")
)
