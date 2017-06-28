var path = require('path')
module.exports = {
  id: 'httpserver',
  createPort: require('ut-port-httpserver'),
  logLevel: 'trace',
  api: ['account'],
  imports: ['account.start'],
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
