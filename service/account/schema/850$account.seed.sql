-- insert roles
INSERT INTO
   account."role" ("name", "description")
VALUES
  ('customer', 'USSD customer role'),
  ('merchant', 'USSD merchant role'),
  ('agent', 'USSD agent role')
ON CONFLICT ("name") DO UPDATE SET "description" = EXCLUDED.description;

-- insert permissions
INSERT INTO
   account."permission" ("name", "description")
VALUES
  ('p2p', 'peer to peer transfer'),
  ('cashIn', 'Cash In'),
  ('cashOut', 'cash Out'),
  ('invoice', 'Invoice issuing / Sell goods'),
  ('ministatement', 'ministatement'),
  ('balanceCheck', 'balance check')
ON CONFLICT ("name") DO UPDATE SET "description" = EXCLUDED.description;

-- insert permissions
INSERT INTO
  account."rolePermission" ("roleId", "permissionId")
SELECT
  (SELECT "roleId" FROM account."role" WHERE "name" = 'customer'),
  p."permissionId"
FROM
  account."permission" p
WHERE
  p."name" IN (
    'p2p',
    'ministatement',
    'balanceCheck'
  )
ON CONFLICT DO NOTHING;

INSERT INTO
  account."rolePermission" ("roleId", "permissionId")
SELECT
  (SELECT "roleId" FROM account."role" WHERE "name" = 'agent'),
  p."permissionId"
FROM
  account."permission" p
WHERE
  p."name" IN (
    'p2p',
    'ministatement',
    'balanceCheck',
    'cashIn',
    'cashOut'
  )
ON CONFLICT DO NOTHING;

INSERT INTO
  account."rolePermission" ("roleId", "permissionId")
SELECT
  (SELECT "roleId" FROM account."role" WHERE "name" = 'merchant'),
  p."permissionId"
FROM
  account."permission" p
WHERE
  p."name" IN (
    'p2p',
    'ministatement',
    'balanceCheck',
    'invoice'
  )
ON CONFLICT DO NOTHING;
