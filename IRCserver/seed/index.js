const {
    sequelize,
    User,
    Message,
    MessageUser,
    Channel,
    ChannelUser,
} = require('../src/models')

/* BONUS FOR SEEDING AND AUTO ADMIN ACCOUNT WITH HASH */

const Promise = require('bluebird')

const users = require('./User/users.json')

const messages = require('./Message/messages.json')
const messagesUsers = require('./Message/messagesUsers.json')

const channels = require('./Channel/channels.json')
const channelsUsers = require('./Channel/channelsUsers.json')

sequelize.sync({ force: true })
    .then(async function() {

        /* ####################################################################### */
        /* USER */
        await Promise.all(
            users.map(user => {
                User.create(user)
            })
        )

        /* ####################################################################### */
        /* MESSAGE */
        await Promise.all(
            messages.map(message => {
                Message.create(message)
            })
        )
        await Promise.all(
            messagesUsers.map(messagesUser => {
                MessageUser.create(messagesUser)
            })
        )

        /* ####################################################################### */
        /* CHANNEL */
        await Promise.all(
            channels.map(channel => {
                Channel.create(channel)
            })
        )
        await Promise.all(
            channelsUsers.map(channelsUser => {
                ChannelUser.create(channelsUser)
            })
        )
    })