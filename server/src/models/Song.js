const pool = require('../db/pool')
const squel = require('squel').useFlavour('mysql')

const Song = {
  get_songs: async () => {
    return new Promise((resolve, reject) => {
      const query = squel.select().from('songs').toString()
      pool.query(query, (err, rows) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        // console.log(rows)
        resolve(rows)
      })
    })
  },
  search_songs: async (search) => {
    return new Promise((resolve, reject) => {
      const query = squel
        .select()
        .from('songs')
        .where(
          "title LIKE '" +
            `%${search}%` +
            "' OR album LIKE '" +
            `%${search}%` +
            "' OR artist LIKE '" +
            `%${search}%` +
            "' OR genre LIKE '" +
            `%${search}%` +
            "'"
        )
        .toString()
      pool.query(query, (err, rows) => {
        if (err) {
          console.log(query)
          reject(err)
        }
        console.log(query)
        resolve(rows)
      })
    })
  },
  find_song: async (songId) => {
    return new Promise((resolve, reject) => {
      const query = squel
        .select()
        .from('songs')
        .where('id = ' + songId)
        .toString()
      pool.query(query, (err, rows) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        // console.log(rows)
        resolve(rows[0])
      })
    })
  },
  insert: async (song) => {
    return new Promise((resolve, reject) => {
      const query = squel
        .insert({ replaceSingleQuotes: true })
        .into('songs')
        .setFieldsRows([song])
        .toString()
      pool.query(query, (err, result) => {
        if (err) {
          reject(err)
          return
        }
        song.id = result.insertId
        resolve(song)
      })
    })
  },
  update: async (song, songId) => {
    console.log(song)
    return new Promise((resolve, reject) => {
      const query = squel
        .update({ replaceSingleQuotes: true })
        .table('songs')
        .setFields(song)
        .where('id = ' + songId)
        .toString()
      pool.query(query, (err, rows) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        // console.log(rows)
        resolve(rows[0])
      })
    })
  }
}

module.exports = Song
