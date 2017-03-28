var test = require('ut-run/test')
var config = require('./../lib/appConfig')
var uuid = require('uuid/v4')
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
    run(test, bus, [
      {
        name: 'Add account 1',
        method: 'account.account.add',
        params: (context) => {
          return {
            'accountNumber': ACCOUNT_NUMBER_1,
            'actorId': ACCOUNT_ACTOR_ID_1,
            'isDefault': true,
            'isSignatory': true
          }
        },
        result: (result, assert) => {
          assert.deepEquals(
            result,
            {
              'accountNumber': ACCOUNT_NUMBER_1,
              'actorId': ACCOUNT_ACTOR_ID_1,
              'isDefault': true,
              'isSignatory': true
            },
            'account 1 successfuly added'
          )
        }
      },
      {
        name: 'Add account 2',
        method: 'account.account.add',
        params: (context) => {
          return {
            'accountNumber': ACCOUNT_NUMBER_2,
            'actorId': ACCOUNT_ACTOR_ID_2,
            'isDefault': true,
            'isSignatory': true
          }
        },
        result: (result, assert) => {
          assert.deepEquals(
            result,
            {
              'accountNumber': ACCOUNT_NUMBER_2,
              'actorId': ACCOUNT_ACTOR_ID_2,
              'isDefault': true,
              'isSignatory': true
            },
            'account 2 successfuly added'
          )
        }
      },
      {
        name: 'Add account 3',
        method: 'account.account.add',
        params: (context) => {
          return {
            'accountNumber': ACCOUNT_NUMBER_3,
            'actorId': ACCOUNT_ACTOR_ID_1,
            'isDefault': false,
            'isSignatory': true
          }
        },
        result: (result, assert) => {
          assert.deepEquals(
            result,
            {
              'accountNumber': ACCOUNT_NUMBER_3,
              'actorId': ACCOUNT_ACTOR_ID_1,
              'isDefault': false,
              'isSignatory': true
            },
            'account 3 successfuly added'
          )
        }
      },
      {
        name: 'Add account without isDefault',
        method: 'account.account.add',
        params: (context) => {
          return {
            'accountNumber': ACCOUNT_NUMBER_4,
            'actorId': ACCOUNT_ACTOR_ID_2,
            'isSignatory': true
          }
        },
        result: (result, assert) => {
          assert.deepEquals(
            result,
            {
              'accountNumber': ACCOUNT_NUMBER_4,
              'actorId': ACCOUNT_ACTOR_ID_2,
              'isDefault': false,
              'isSignatory': true
            },
            'account without isDefault successfuly added'
          )
        }
      },
      {
        name: 'Add account without isSignatory',
        method: 'account.account.add',
        params: (context) => {
          return {
            'accountNumber': ACCOUNT_NUMBER_5,
            'actorId': ACCOUNT_ACTOR_ID_2,
            'isDefault': false
          }
        },
        result: (result, assert) => {
          assert.deepEquals(
            result,
            {
              'accountNumber': ACCOUNT_NUMBER_5,
              'actorId': ACCOUNT_ACTOR_ID_2,
              'isDefault': false,
              'isSignatory': false
            },
            'account without isDefault successfuly added'
          )
        }
      },
      {
        name: 'Fetch by actorId',
        method: 'account.account.fetch',
        params: (context) => {
          return {
            actorId: ACCOUNT_ACTOR_ID_1
          }
        },
        result: (result, assert) => {
          assert.deepEquals(
            result,
            [
              {
                'accountNumber': ACCOUNT_NUMBER_1,
                'actorId': ACCOUNT_ACTOR_ID_1,
                'isDefault': true,
                'isSignatory': true
              },
              {
                'accountNumber': ACCOUNT_NUMBER_3,
                'actorId': ACCOUNT_ACTOR_ID_1,
                'isDefault': false,
                'isSignatory': true
              }
            ],
            'fetched by accountId successfuly'
          )
        }
      },
      {
        name: 'Fetch by account number',
        method: 'account.account.fetch',
        params: (context) => {
          return {
            accountNumber: ACCOUNT_NUMBER_1
          }
        },
        result: (result, assert) => {
          assert.deepEquals(
            result,
            [
              {
                'accountNumber': ACCOUNT_NUMBER_1,
                'actorId': ACCOUNT_ACTOR_ID_1,
                'isDefault': true,
                'isSignatory': true
              }
            ],
            'fetched by actor number successfuly'
          )
        }
      },
      {
        name: 'Fetch by unknown account number',
        method: 'account.account.fetch',
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
        name: 'Get by account number',
        method: 'account.account.get',
        params: (context) => {
          return {
            accountNumber: ACCOUNT_NUMBER_1
          }
        },
        result: (result, assert) => {
          assert.deepEquals(
            result,
            {
              'accountNumber': ACCOUNT_NUMBER_1,
              'actorId': ACCOUNT_ACTOR_ID_1,
              'isDefault': true,
              'isSignatory': true
            },
            'get by actor number successfuly'
          )
        }
      },
      {
        name: 'Get by no account number',
        method: 'account.account.get',
        params: (context) => {
          return {}
        },
        error: (result, assert) => {
          assert.equals(
            result.errorPrint,
            'account.accountNotFound',
            'get by no account number throws'
          )
        }
      },
      {
        name: 'Get by no account number',
        method: 'account.account.get',
        params: (context) => {
          return {
            actorId: ACCOUNT_ACTOR_ID_1
          }
        },
        error: (result, assert) => {
          assert.equals(
            result.errorPrint,
            'account.accountNotFound',
            'get by no account number throws'
          )
        }
      },
      {
        name: 'Get by account number and actorId',
        method: 'account.account.get',
        params: (context) => {
          return {
            accountNumber: ACCOUNT_NUMBER_1,
            actorId: ACCOUNT_ACTOR_ID_1
          }
        },
        result: (result, assert) => {
          assert.deepEquals(
            result,
            {
              'accountNumber': ACCOUNT_NUMBER_1,
              'actorId': ACCOUNT_ACTOR_ID_1,
              'isDefault': true,
              'isSignatory': true
            },
            'get by actor number and actorId successfuly'
          )
        }
      },
      {
        name: 'Get by account number and wrong actorId',
        method: 'account.account.get',
        params: (context) => {
          return {
            accountNumber: ACCOUNT_NUMBER_1,
            actorId: ACCOUNT_ACTOR_ID_2
          }
        },
        error: (result, assert) => {
          assert.equals(
            result.errorPrint,
            'account.accountNotFound',
            'get by account number and wrong actorId throws'
          )
        }
      },
      {
        name: 'Edit with missing account number',
        method: 'account.account.edit',
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
            'account.accountNotFound',
            'edit with missing account number throws'
          )
        }
      },
      {
        name: 'Edit with missing actorId',
        method: 'account.account.edit',
        params: (context) => {
          return {
            accountNumber: ACCOUNT_NUMBER_1,
            isDefault: false,
            isSignatory: false
          }
        },
        error: (result, assert) => {
          assert.equals(
            result.errorPrint,
            'account.accountNotFound',
            'edit with missing actorId throws'
          )
        }
      },
      {
        name: 'Edit with missing isSignatory',
        method: 'account.account.edit',
        params: (context) => {
          return {
            accountNumber: ACCOUNT_NUMBER_1,
            actorId: ACCOUNT_ACTOR_ID_1,
            isDefault: false
          }
        },
        result: (result, assert) => {
          assert.deepEquals(
            result,
            {
              'accountNumber': ACCOUNT_NUMBER_1,
              'actorId': ACCOUNT_ACTOR_ID_1,
              'isDefault': false,
              'isSignatory': true
            },
            'edit account with missing isSignatory successfuly'
          )
        }
      },
      {
        name: 'Edit with missing isSignatory',
        method: 'account.account.edit',
        params: (context) => {
          return {
            accountNumber: ACCOUNT_NUMBER_1,
            actorId: ACCOUNT_ACTOR_ID_1,
            isSignatory: false
          }
        },
        error: (result, assert) => {
          assert.equals(
            result.errorPrint,
            'account.accountNotFound',
            'edit with missing isSignatory throws'
          )
        }
      },
      {
        name: 'Edit account',
        method: 'account.account.edit',
        params: (context) => {
          return {
            accountNumber: ACCOUNT_NUMBER_1,
            actorId: ACCOUNT_ACTOR_ID_1,
            isDefault: false,
            isSignatory: false
          }
        },
        result: (result, assert) => {
          assert.deepEquals(
            result,
            {
              'accountNumber': ACCOUNT_NUMBER_1,
              'actorId': ACCOUNT_ACTOR_ID_1,
              'isDefault': false,
              'isSignatory': false
            },
            'edit account successfuly'
          )
        }
      },
      {
        name: 'Remove account with missing account number',
        method: 'account.account.remove',
        params: (context) => {
          return {
            actorId: ACCOUNT_ACTOR_ID_1
          }
        },
        result: (result, assert) => {
          assert.deepEquals(
            result,
            [],
            'remove with missing account number'
          )
        }
      },
      {
        name: 'Remove account with missing actorId',
        method: 'account.account.remove',
        params: (context) => {
          return {
            accountNumber: ACCOUNT_NUMBER_1
          }
        },
        result: (result, assert) => {
          assert.deepEquals(
            result,
            [],
            'remove with missing actorId'
          )
        }
      },
      {
        name: 'Remove account',
        method: 'account.account.remove',
        params: (context) => {
          return {
            accountNumber: ACCOUNT_NUMBER_1,
            actorId: ACCOUNT_ACTOR_ID_1
          }
        },
        result: (result, assert) => {
          assert.deepEquals(
            result,
            {
              accountNumber: ACCOUNT_NUMBER_1
            },
            'remove account successfuly'
          )
        }
      }
    ])
  }
}, module.parent)
