var test = require('ut-run/test')
var config = require('./../lib/appConfig')
var uuid = require('uuid/v4')
var joi = require('joi')
const ACCOUNT_NUMBER_1 = uuid().slice(0, 20)
const ACCOUNT_NUMBER_2 = uuid().slice(0, 20)
const ACCOUNT_NUMBER_3 = uuid().slice(0, 20)
const ACCOUNT_NUMBER_4 = uuid().slice(0, 20)
const ACCOUNT_NUMBER_5 = uuid().slice(0, 20)
const ACCOUNT_ACTOR_ID_1 = uuid().slice(0, 10)
const ACCOUNT_ACTOR_ID_2 = uuid().slice(0, 10)

test({
  type: 'integration',
  name: 'DFSP account test',
  server: config.server,
  serverConfig: config.serverConfig,
  client: config.client,
  clientConfig: config.clientConfig,
  steps: function (test, bus, run) {
    return run(test, bus, [
      {
        name: 'Add account 1',
        method: 'account.actorAccount.add',
        params: (context) => {
          return {
            'accountNumber': ACCOUNT_NUMBER_1,
            'actorId': ACCOUNT_ACTOR_ID_1,
            'isDefault': true,
            'isSignatory': true
          }
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result.body, joi.object().keys({
            accountId: joi.number(),
            accountNumber: joi.string().valid(ACCOUNT_NUMBER_1),
            actorAccountId: joi.number(),
            actorId: joi.string().valid(ACCOUNT_ACTOR_ID_1),
            isDefault: joi.boolean().truthy(),
            isSignatory: joi.boolean().truthy(),
            permissions: joi.array().valid(['p2p', 'ministatement', 'balanceCheck'])
          })).error, null, 'account 1 successfuly added')
        }
      },
      {
        name: 'Add account 2',
        method: 'account.actorAccount.add',
        params: (context) => {
          return {
            'accountNumber': ACCOUNT_NUMBER_2,
            'actorId': ACCOUNT_ACTOR_ID_2,
            'isDefault': true,
            'isSignatory': true
          }
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result.body, joi.object().keys({
            accountId: joi.number(),
            accountNumber: joi.string().valid(ACCOUNT_NUMBER_2),
            actorAccountId: joi.number(),
            actorId: joi.string().valid(ACCOUNT_ACTOR_ID_2),
            isDefault: joi.boolean().truthy(),
            isSignatory: joi.boolean().truthy(),
            permissions: joi.array().valid(['p2p', 'ministatement', 'balanceCheck'])
          })).error, null, 'account 2 successfuly added')
        }
      },
      {
        name: 'Add account 3',
        method: 'account.actorAccount.add',
        params: (context) => {
          return {
            'accountNumber': ACCOUNT_NUMBER_3,
            'actorId': ACCOUNT_ACTOR_ID_1,
            'isDefault': false,
            'isSignatory': true
          }
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result.body, joi.object().keys({
            accountId: joi.number(),
            accountNumber: joi.string().valid(ACCOUNT_NUMBER_3),
            actorAccountId: joi.number(),
            actorId: joi.string().valid(ACCOUNT_ACTOR_ID_1),
            isDefault: joi.boolean().truthy(),
            isSignatory: joi.boolean().truthy(),
            permissions: joi.array().valid(['p2p', 'ministatement', 'balanceCheck'])
          })).error, null, 'account 3 successfuly added')
        }
      },
      {
        name: 'Add account without isDefault',
        method: 'account.actorAccount.add',
        params: (context) => {
          return {
            'accountNumber': ACCOUNT_NUMBER_4,
            'actorId': ACCOUNT_ACTOR_ID_2,
            'isSignatory': true
          }
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result.body, joi.object().keys({
            accountId: joi.number(),
            accountNumber: joi.string().valid(ACCOUNT_NUMBER_4),
            actorAccountId: joi.number(),
            actorId: joi.string().valid(ACCOUNT_ACTOR_ID_2),
            isDefault: joi.boolean().falsy(),
            isSignatory: joi.boolean().truthy(),
            permissions: joi.array().valid(['p2p', 'ministatement', 'balanceCheck'])
          })).error, null, 'account without isDefault successfuly added')
        }
      },
      {
        name: 'Add account without isSignatory',
        method: 'account.actorAccount.add',
        params: (context) => {
          return {
            'accountNumber': ACCOUNT_NUMBER_5,
            'actorId': ACCOUNT_ACTOR_ID_2,
            'isDefault': false
          }
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result.body, joi.object().keys({
            accountId: joi.number(),
            accountNumber: joi.string().valid(ACCOUNT_NUMBER_5),
            actorAccountId: joi.number(),
            actorId: joi.string().valid(ACCOUNT_ACTOR_ID_2),
            isDefault: joi.boolean().falsy(),
            isSignatory: joi.boolean().falsy(),
            permissions: joi.array().valid(['p2p', 'ministatement', 'balanceCheck'])
          })).error, null, 'account without isSignatory successfuly added')
        }
      },
      {
        name: 'Fetch by actorId',
        method: 'account.actorAccount.fetch',
        params: (context) => {
          return {
            actorId: ACCOUNT_ACTOR_ID_1
          }
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result.body, joi.array().items([{
            accountId: joi.number(),
            accountNumber: joi.string().valid(ACCOUNT_NUMBER_1),
            actorAccountId: joi.number(),
            actorId: joi.string().valid(ACCOUNT_ACTOR_ID_1),
            isDefault: joi.boolean().truthy(),
            isSignatory: joi.boolean().truthy(),
            permissions: joi.array().valid(['p2p', 'ministatement', 'balanceCheck'])
          },
          {
            accountId: joi.number(),
            accountNumber: joi.string().valid(ACCOUNT_NUMBER_3),
            actorAccountId: joi.number(),
            actorId: joi.string().valid(ACCOUNT_ACTOR_ID_1),
            isDefault: joi.boolean().falsy(),
            isSignatory: joi.boolean().truthy(),
            permissions: joi.array().valid(['p2p', 'ministatement', 'balanceCheck'])
          }])).error, null, 'fetched by accountId successfuly')
        }
      },
      {
        name: 'Fetch by account number',
        method: 'account.actorAccount.fetch',
        params: (context) => {
          return {
            accountNumber: ACCOUNT_NUMBER_1
          }
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result.body, joi.array().items([{
            accountId: joi.number(),
            accountNumber: joi.string().valid(ACCOUNT_NUMBER_1),
            actorAccountId: joi.number(),
            actorId: joi.string().valid(ACCOUNT_ACTOR_ID_1),
            isDefault: joi.boolean().truthy(),
            isSignatory: joi.boolean().truthy(),
            permissions: joi.array().valid(['p2p', 'ministatement', 'balanceCheck'])
          }])).error, null, 'fetched by actor number successfuly')
        }
      },
      {
        name: 'Fetch by unknown account number',
        method: 'account.actorAccount.fetch',
        params: (context) => {
          return {
            accountNumber: ACCOUNT_NUMBER_1 + '1'
          }
        },
        result: (result, assert) => {
          assert.deepEquals(
            result,
            [],
            'fetched by unknown actor number successfuly'
          )
        }
      },
      {
        name: 'Get by actorAccountId',
        method: 'account.actorAccount.get',
        params: (context) => {
          return {
            actorAccountId: context['Add account 1'].actorAccountId
          }
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result.body, joi.object().keys({
            accountId: joi.number(),
            accountNumber: joi.string().valid(ACCOUNT_NUMBER_1),
            actorAccountId: joi.number(),
            actorId: joi.string().valid(ACCOUNT_ACTOR_ID_1),
            isDefault: joi.boolean().truthy(),
            isSignatory: joi.boolean().truthy(),
            permissions: joi.array().valid(['p2p', 'ministatement', 'balanceCheck'])
          })).error, null, 'get by actor number successfuly')
        }
      },
      {
        name: 'Get by no actorAccountId',
        method: 'account.actorAccount.get',
        params: (context) => {
          return {}
        },
        error: (result, assert) => {
          assert.equals(
            result.errorPrint,
            'Account not found',
            'Get actor account with missing actorAccountId'
          )
        }
      },
      {
        name: 'Get by wrong actorAccountId',
        method: 'account.actorAccount.get',
        params: (context) => {
          return {
            actorAccountId: context['Add account 1'].actorAccountId * 1330331
          }
        },
        error: (result, assert) => {
          assert.equals(
            result.errorPrint,
            'Account not found',
            'get by wrong actorAccountId'
          )
        }
      },
      {
        name: 'Edit with missing accountId and actorAccountId',
        method: 'account.actorAccount.edit',
        params: (context) => {
          return {
            actorId: ACCOUNT_ACTOR_ID_2,
            isDefault: false,
            isSignatory: false
          }
        },
        error: (result, assert) => {
          assert.equals(
            result.errorPrint,
            'Account not found',
            'edit with missing accountId and actorAccountId throws'
          )
        }
      },
      {
        name: 'Edit with missing actorId and actorAccountId',
        method: 'account.actorAccount.edit',
        params: (context) => {
          return {
            accountId: context['Add account 1'].accountId,
            isDefault: false,
            isSignatory: false
          }
        },
        error: (result, assert) => {
          assert.equals(
            result.errorPrint,
            'Account not found',
            'edit with missing actorId and actorAccountId throws'
          )
        }
      },
      {
        name: 'Edit with missing isSignatory',
        method: 'account.actorAccount.edit',
        params: (context) => {
          return {
            actorAccountId: context['Add account 1'].actorAccountId,
            isDefault: false
          }
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result.body, joi.object().keys({
            accountId: joi.number(),
            accountNumber: joi.string().valid(ACCOUNT_NUMBER_1),
            actorAccountId: joi.number(),
            actorId: joi.string().valid(ACCOUNT_ACTOR_ID_1),
            isDefault: joi.boolean().falsy(),
            isSignatory: joi.boolean().truthy(),
            permissions: joi.array().valid(['p2p', 'ministatement', 'balanceCheck'])
          })).error, null, 'edit account with missing isSignatory successfuly')
        }
      },
      {
        name: 'Edit with missing isDefault',
        method: 'account.actorAccount.edit',
        params: (context) => {
          return {
            actorAccountId: context['Add account 1'].actorAccountId,
            isSignatory: false
          }
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result.body, joi.object().keys({
            accountId: joi.number(),
            accountNumber: joi.string().valid(ACCOUNT_NUMBER_1),
            actorAccountId: joi.number(),
            actorId: joi.string().valid(ACCOUNT_ACTOR_ID_1),
            isDefault: joi.boolean().falsy(),
            isSignatory: joi.boolean().truthy(),
            permissions: joi.array().valid(['p2p', 'ministatement', 'balanceCheck'])
          })).error, null, 'edit account with missing isDefault successfuly')
        }
      },
      {
        name: 'Edit account',
        method: 'account.actorAccount.edit',
        params: (context) => {
          return {
            actorAccountId: context['Add account 1'].actorAccountId,
            isDefault: false,
            isSignatory: false
          }
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result.body, joi.object().keys({
            accountId: joi.number(),
            accountNumber: joi.string().valid(ACCOUNT_NUMBER_1),
            actorAccountId: joi.number(),
            actorId: joi.string().valid(ACCOUNT_ACTOR_ID_1),
            isDefault: joi.boolean().falsy(),
            isSignatory: joi.boolean().falsy(),
            permissions: joi.array().valid(['p2p', 'ministatement', 'balanceCheck'])
          })).error, null, 'edit account successfuly')
        }
      },
      {
        name: 'Edit account - missing data',
        method: 'account.actorAccount.edit',
        params: (context) => {
          return {}
        },
        error: (error, assert) => {
          assert.equals(error.errorPrint, 'Account not found', 'Check account not found error')
        }
      },
      {
        name: 'Remove account with missing actorAccountId',
        method: 'account.actorAccount.remove',
        params: (context) => {
          return {
            actorAccountId: context['Add account 1'].actorAccountId * 1330331
          }
        },
        error: (result, assert) => {
          assert.equals(
            result.errorPrint,
            'Account not found',
            'remove with missing actorAccountId'
          )
        }
      },
      {
        name: 'Remove account',
        method: 'account.actorAccount.remove',
        params: (context) => {
          return {
            actorAccountId: context['Add account 1'].actorAccountId
          }
        },
        result: function (result, assert) {
          assert.deepEquals(
            result,
            {
              accountId: this['Add account 1'].accountId
            },
            'remove account successfuly'
          )
        }
      }
    ])
  }
}, module.parent)
