const mysql = require('mysql')
const config = require('../config/config')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
  port: 3306,
  dateStrings: true,
  insecureAuth: true
})

module.exports = pool
