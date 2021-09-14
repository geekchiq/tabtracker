const Bookmark = require('../models/Bookmark')
// const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const { userId, songId } = req.query
      console.log(`${userId} ${songId}`)
      const search = {
        UserId: userId
      }
      if (songId) {
        search.SongId = songId
      }
      console.log(search)

      const bookmark = await Bookmark.find_bookmark(search)
      if (!bookmark) {
        return res.status(403).send({
          error: 'Error occured while trying to get bookmark'
        })
      }
      res.send(bookmark)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occurered trying to get bookmark' + err
      })
    }
  },
  async post(req, res) {
    try {
      console.log(req)
      const bookmark = await Bookmark.insert(req.body)
      res.send(bookmark)
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Error while saving the bookmark.'
      })
    }
  },
  async remove(req, res) {
    try {
      const { bookmarkId } = req.params
      const bookmark = await Bookmark.delete(bookmarkId)
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the bookmark'
      })
    }
  }
}
