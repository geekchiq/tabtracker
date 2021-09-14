const Song = require('../models/Song')

module.exports = {
  async index(req, res) {
    try {
      let song = null
      const search = req.query.search
      if (search) {
        song = await Song.search_songs(search)
      } else {
        song = await Song.get_songs()
      }
      if (!song) {
        return res.status(403).send({
          error: 'Error occured while trying to get songs'
        })
      }
      res.send(song)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occurered trying to search song' + err
      })
    }
  },
  async show(req, res) {
    try {
      const search = req.params.songId
      const song = await Song.find_song(search)
      if (!song) {
        return res.status(403).send({
          error: 'Error occured while trying to get songs'
        })
      }
      res.send(song)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occurered trying to search song' + err
      })
    }
  },
  async post(req, res) {
    try {
      const song = await Song.insert(req.body)
      res.send(song)
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Error while saving the song.'
      })
    }
  },
  async put(req, res) {
    try {
      const song = await Song.update(req.body, req.params.songId)
      res.send(song)
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Error while updating the song.'
      })
    }
  }
}
