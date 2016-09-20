var create = require('ut-error').define
var Account = create('account')

module.exports = {
  account: function (cause) {
    return new Account(cause)
  }
}
