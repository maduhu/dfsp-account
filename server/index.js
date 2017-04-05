module.exports = {
  ports: [
    require('../db'),
    require('../httpserver')
  ],
  modules: {
    account: require('../service/account')
  },
  validations: {
    account: require('../service/account/api')
  }
}
