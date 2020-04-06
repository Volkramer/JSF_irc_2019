const ChannelsMessageController = require('../../controllers/Channel/ChannelsMessageController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/channelsmessage',
            // isAuthenticated,
            ChannelsMessageController.index) // all channel for the user connect
    app.get('/channelsmessage/:channelId',
        // isAuthenticated,
        ChannelsMessageController.getChannelMessages)
    app.post('/channelsmessage',
        // isAuthenticated,
        ChannelsMessageController.post)
    app.delete('/channelsmessage/:channelMessageId',
        // isAuthenticated,
        ChannelsMessageController.delete)
}