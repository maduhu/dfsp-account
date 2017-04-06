var joi = require('joi')
module.exports = {
  'actorAccount.get': {
    // tags: ['tag1', 'tag2'],
    description: '',
    notes: '',
    auth: false,
    params: joi.any(),
    result: joi.any()
  },
  'actorAccount.add': {
    // tags: ['tag1', 'tag2'],
    description: '',
    notes: '',
    auth: false,
    params: joi.any(),
    result: joi.any()
  },
  'actorAccount.remove': {
    // tags: ['tag1', 'tag2'],
    description: '',
    notes: '',
    auth: false,
    params: joi.any(),
    result: joi.any()
  },
  'actorAccount.fetch': {
    // tags: ['tag1', 'tag2'],
    description: '',
    notes: '',
    auth: false,
    params: joi.any(),
    result: joi.any()
  },
  'actorAccount.edit': {
    description: '',
    notes: '',
    auth: false,
    params: joi.any(),
    result: joi.any()
  },
  'actorAccountPermission.add': {
    description: '',
    notes: '',
    auth: false,
    params: joi.any(),
    result: joi.any()
  },
  'actorAccountPermission.get': {
    description: '',
    notes: '',
    auth: false,
    params: joi.any(),
    result: joi.any()
  },
  'actorAccountPermission.remove': {
    description: '',
    notes: '',
    auth: false,
    params: joi.any(),
    result: joi.any()
  },
  'role.fetch': {
    description: 'Fetch roles',
    notes: '',
    auth: false,
    params: joi.any(),
    result: joi.any()
  }
}
