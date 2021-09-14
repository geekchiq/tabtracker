const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
const pool = require('../db/pool')
const squel = require('squel').useFlavour('mysql')

function hashPassword(password) {
  const SALT_FACTOR = 2

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then((salt) => bcrypt.hashAsync(password, salt, null))
    .then((hash) => hash)
}

const User = {
  insert: async (user) => {
    user.password = await hashPassword(user.password)
    return new Promise((resolve, reject) => {
      const query = squel
        .insert()
        .into('users')
        .setFieldsRows([user])
        .toString()
      pool.query(query, (err, result) => {
        if (err) {
          reject(err)
          return
        }
        user.id = result.insertId
        resolve(user)
      })
    })
  },
  get_user: async (email) => {
    return new Promise((resolve, reject) => {
      const query = squel
        .select()
        .from('users')
        .where('email = ?', email)
        .toString()
      pool.query(query, (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows[0])
      })
    })
  },
  comparePassword: async (password, hashPassword) =>
    bcrypt.compareAsync(password, hashPassword)
}

module.exports = User
