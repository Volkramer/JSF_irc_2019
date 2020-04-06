const ChannelsUserController = require('../../controllers/Channel/ChannelsUserController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/channelsuser',
            // isAuthenticated,
            ChannelsUserController.index) // all channel for the user connect
    app.get('/channelsuser/:channelId',
        // isAuthenticated,
        ChannelsUserController.getChannelUsers)
    app.post('/channelsuser',
        // isAuthenticated,
        ChannelsUserController.post)
    app.delete('/channelsuser/:channelUserId',
        // isAuthenticated,
        ChannelsUserController.delete)
}