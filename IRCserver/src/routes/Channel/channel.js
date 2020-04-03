const ChannelController = require('../../controllers/Channel/ChannelsController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/dashboard',
        isAuthenticated,
        ChannelController.index)
    app.get('/channel/:channelId',
        isAuthenticated,
        ChannelController.getChannel)
    app.post('/channel/:channelId',
        isAuthenticated,
        ChannelController.post)
    app.delete('/channel/:channelId',
        isAuthenticated,
        ChannelController.delete)
}