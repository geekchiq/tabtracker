console.log('hello')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
// const { sequelize } = require('./models')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })
// app.post('/', function (req, res) {
//   res.send('Got a POST request')
// })
require('./routes')(app)

app.listen(config.port)
console.log(`Server started at ${config.port}`)

// sequelize.sync({ force: false })
//   .then(() => {
//     app.listen(config.port)
//     console.log(`Server started at port ${config.port}`)
//   })
