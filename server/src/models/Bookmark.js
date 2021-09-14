const Promise = require('bluebird')
const pool = require('../db/pool')
const squel = require('squel').useFlavour('mysql')

const Bookmark = {
  find_bookmark: async (search) => {
    console.log('Bookmarks ', search)
    return new Promise((resolve, reject) => {
      const query = squel
        .select()
        .from('bookmarks')
        .where('songId = ' + search.SongId + ' AND userId =' + search.UserId)
        .toString()
      pool.query(query, (err, rows) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        resolve(rows[0])
      })
    })
  },
  insert: async (bookmark) => {
    return new Promise((resolve, reject) => {
      console.log('bookmark', bookmark)
      const query = squel
        .insert({ replaceSingleQuotes: true })
        .into('bookmarks')
        .setFields(bookmark)
        // .setFieldsRows([bookmark.params])
        .toString()
      pool.query(query, (err, result) => {
        if (err) {
          reject(err)
          return
        }
        bookmark.id = result.insertId
        resolve(bookmark)
      })
    })
  },
  delete: async (bookmarkId) => {
    return new Promise((resolve, reject) => {
      const query = squel
        .delete()
        .from('bookmarks')
        .where('id = ' + bookmarkId)
        .toString()
      pool.query(query, (err, rows) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        console.log(rows)
        resolve(rows[0])
      })
    })
  }
}

module.exports = Bookmark
