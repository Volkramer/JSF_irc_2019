const ChannelController = require('../../controllers/Channel/ChannelsController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/channels',
        isAuthenticated,
        ChannelController.index)
    app.get('/channels/:channelId',
        isAuthenticated,
        ChannelController.getChannel)
    app.post('/channels',
        isAuthenticated,
        ChannelController.post)
    app.delete('/channels/:channelId',
        isAuthenticated,
        ChannelController.delete)
    app.put('/channels/:channelId',
        isAuthenticated,
        ChannelController.update)
}