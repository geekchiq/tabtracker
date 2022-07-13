const AuthenticationController = require('./controllers/AuthenticationController_Sequelize')
const AuthenticationControllerPolicy = require('./policies/AuthenticationContrlollerPolicy')
const SongsController = require('./controllers/SongsController_Sequelize')
const BookmarksController = require('./controllers/BookmarksController_Sequelize')
// const HistoriesController = require('./controllers/HistoriesController')

// const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  app.post(
    '/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  )
  app.post('/login', AuthenticationController.login)

  app.get('/songs', SongsController.index)
  app.get('/songs/:songId', SongsController.show)
  app.put('/songs/:songId', SongsController.put)
  app.post('/songs', SongsController.post)

  app.get(
    '/bookmarks',
    // isAuthenticated,
    BookmarksController.index
  )
  app.post(
    '/bookmarks',
    // isAuthenticated,
    BookmarksController.post
  )
  app.delete(
    '/bookmarks/:bookmarkId',
    // isAuthenticated,
    BookmarksController.remove
  )

  // app.get('/histories',
  //   isAuthenticated,
  //   HistoriesController.index)
  // app.post('/histories',
  //   isAuthenticated,
  //   HistoriesController.post)
}
