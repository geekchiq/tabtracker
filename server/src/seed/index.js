const {
  sequelize,
  Song,
  User,
  Bookmark
  //   History
} = require('../src/models')
const Promise = require('bluebird')
const songs = require('./songs.json')
const users = require('./users.json')
const bookmarks = require('./bookmarks.json')
// const histories = require('./histories.json')

sequelize.sync({ force: false }).then(async function () {
  await Promise.map(users, async (user) => {
    await User.create(user)
  })

  await Promise.map(songs, async (song) => {
    await Song.create(song)
  })

  await Promise.all(
    bookmarks.forEach((bookmark) => {
      Bookmark.create(bookmark)
    })
  )

  // await Promise.all(
  //   histories.map(history => {
  //     History.create(history)
  //   })
  // )
})
