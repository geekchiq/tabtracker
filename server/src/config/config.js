const path = require('path')

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'tabtracker',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'admin1234',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      dialectModule: require('mysql2'),
      host: process.env.HOSR || 'localhost',
      storage: path.resolve(__dirname, './tabtracker.mysql')
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
