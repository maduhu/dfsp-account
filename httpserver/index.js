var path = require('path')
module.exports = {
  id: 'httpserver',
  createPort: require('ut-port-httpserver'),
  logLevel: 'trace',
  api: ['account'],
  // imports: ['account.start'], // removed due to increasing the code coverage
  port: 8009,
  allowXFF: true,
  disableXsrf: {
    http: true,
    ws: true
  },
  bundle: 'account',
  dist: path.resolve(__dirname, '../dist'),
  routes: {
    rpc: {
      method: '*',
      path: '/rpc/{method?}',
      config: {
        app: {
          skipIdentityCheck: true
        },
        tags: ['rpc'],
        auth: false
      }
    }
  }
}
