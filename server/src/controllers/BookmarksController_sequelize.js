const { Bookmark, Song } = require('../models')
// const _ = require('lodash')

module.exports = {
  async index(req, res) {
    console.log('Bookmark Index')
    try {
      const { userId, songId } = req.query
      console.log(`${userId} ${songId}`)
      const where = {
        UserId: userId
      }
      if (songId) {
        where.SongId = songId
      }
      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [
          {
            model: Song
          }
        ]
      })
      // .map((bookmark) => bookmark.toJSON())
      // .map((bookmark) => _.extend({}, bookmark.Song, bookmark))
      res.send(bookmarks)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occured trying to fetch the bookmark'
      })
    }
  },
  async post(req, res) {
    try {
      const { userId, songId } = req.body
      console.log(`${userId} ${songId}`)
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if (bookmark) {
        return res.status(400).send({
          error: 'you already have this set as a bookmark'
        })
      }
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occured trying to create the bookmark'
      })
    }
  },
  async remove(req, res) {
    try {
      const { bookmarkId } = req.params
      console.log(`Deleting ${bookmarkId}`)
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId
          // UserId: userId
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'you do not have access to this bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the bookmark'
      })
    }
  }
}
