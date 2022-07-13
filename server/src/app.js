console.log('hello')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const { sequelize, Song } = require('./models')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

require('./routes')(app)

// app.listen(config.port)
// console.log(`Server started at ${config.port}`)

sequelize.sync({ force: false }).then(() => {
  app.listen(config.port)
  initial()
  console.log(`Server started at port ${config.port}`)
})

function initial() {
  Song.create({
    title: 'Left And Right',
    artist: 'Charlie Puth feat BTS',
    genre: 'Pop',
    album: 'Left And Right EP',
    albumImageUrl: 'To Follow',
    youtubeId: 'https://www.youtube.com/watch?v=a7GITgqwDVg',
    lyrics: 'To be filled',
    tab: 'To be filled'
  })
}
