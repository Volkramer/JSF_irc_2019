const MessagesUserController = require('../../controllers/Message/MessagesUserController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/messagesuser',
        // isAuthenticated,
        MessagesUserController.index)
    app.get('/messagesuser/:userId',
        // isAuthenticated,
        MessagesUserController.getMessagesUser)
    app.post('/messagesuser',
        // isAuthenticated,
        MessagesUserController.post)
    app.delete('/messagesuser/:messageUserId',
        // isAuthenticated,
        MessagesUserController.delete)
}