module.exports = {
  ports: [
    require('../db'),
    require('../httpserver'),
    require('../script')
  ],
  modules: {
    identity: require('../service/identity'),
    account: require('../service/account')
  }
}
