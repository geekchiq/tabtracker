const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.insert(req.body)
      res.send({
        user: user,
        token: jwtSignUser(JSON.parse(JSON.stringify(user)))
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Email already in use.'
      })
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.get_user(email)
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await User.comparePassword(
        password,
        user.password
      )
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The password is invalid'
        })
      }

      res.send({
        user: user,
        token: jwtSignUser(JSON.parse(JSON.stringify(user)))
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occurered trying to login'
      })
    }
  }
}
