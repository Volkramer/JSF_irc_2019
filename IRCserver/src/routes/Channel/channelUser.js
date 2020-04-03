const ChannelsUserController = require('../../controllers/Channel/ChannelsUserController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/channelsuser',
        isAuthenticated,
        ChannelsUserController.index)
    app.post('/channelsuser',
        isAuthenticated,
        ChannelsUserController.post)
    app.delete('/channelsuser/:channelUserId',
        isAuthenticated,
        ChannelsUserController.delete)
}