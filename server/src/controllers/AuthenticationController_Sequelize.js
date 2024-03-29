const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.secret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register(req, res) {
    console.log('AuthenticationController.js')
    try {
      const user = await User.create(req.body)
      console.log('Created ' + user)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.log('ERR', err)
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body

      console.log(`AuthenticationController.js ${email} ${password}`)

      const user = await User.findOne({
        where: {
          email: email
        }
      })

      console.log(`AuthenticationController.js ${user}`)

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect (Email)'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect (Password)'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  }
}
