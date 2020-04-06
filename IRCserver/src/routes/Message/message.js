const MessageController = require('../../controllers/Message/MessagesController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/messages',
        // isAuthenticated,
        MessageController.index)
    app.get('/messages/:messageId',
        // isAuthenticated,
        MessageController.getMessage)
    app.post('/messages',
        // isAuthenticated,
        MessageController.post)
    app.delete('/messages/:messageId',
        // isAuthenticated,
        MessageController.delete)
    app.put('/messages/:messagelId',
        // isAuthenticated,
        MessageController.update)
}