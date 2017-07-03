var create = require('ut-error').define
var defaultErrorCode = 400

module.exports = {
  error: [
    {
      type: 'account',
      message: 'account error'
    },
    {
      id: 'AccountNotFoundError',
      type: 'account.accountNotFound',
      message: 'Account not found',
      statusCode: 422
    }
  ].reduce((exporting, error) => {
    var typePath = error.type.split('.')
    var Ctor = create(typePath.pop(), typePath.join('.'), error.message)
    /**
     * Exceptions thrown from the db procedures will not execute this function
     * It will only be executed if an error is throw from JS
     */
    exporting[error.type] = function (params) {
      return new Ctor({
        isJsError: true,
        params: params,
        statusCode: error.statusCode || defaultErrorCode,
        id: error.id || error.type
      })
    }
    return exporting
  }, {})
}
