const {
    sequelize,
    User, // NO CARE
    Message,
    MessageUser,
    Channel,
    ChannelUser,
} = require('../models')

const MessagesController = require('../controllers/Message/MessagesController')

module.exports = function(io) {
    var channels = []

    io.on('connection', function(socket) {
        var address = socket.request.connection.remoteAddress
        var socketID = socket.id

        console.log('user ' + address + ' connected. Socket ID: ' + socketID)

        socket.on('nickname', function(data) {
            // ### TODO ###
            // find data.userID
            // change nickname
            console.log(
                'user ' + user.socket.id + 'change his nickname for ' + nickname
            )
        })

        socket.on('join-channel', function(data) {
            const newChannel = {
                name: data.name,
            }
            const user = {
                id: data.userId
            }
            try {
                await Channel.findAll({
                    where: {
                        name: newChannel.name
                    }
                }).then(async(data) => {
                    if (!data) {
                        try {
                            await Channel.create(newChannel).then(async(data) => {
                                await ChannelUser.create({
                                    ChannelId: data.id,
                                    UserId: user.id
                                })
                                socket.join(newChannel.name)
                            })
                        } catch (err) {
                            console.log(err)
                        }
                    } else {
                        await ChannelUser.create({
                            ChannelId: data.id,
                            UserId: user.id
                        })
                        socket.join(newChannel.name)
                    }
                })
            } catch (err) {
                console.log(err)
            }
        })

        socket.on('leave-channel', (data) => {
            //when user leave a channel remove ChannelUser entry


        })

        socket.on('disconnect', function() {
            console.log('user ' + socketID + ' disconnected.')
        })

        socket.on('new-message', async(data) => {
            const newMessage = {
                message: data.message,
                username: data.username,
                userId: data.userId,
                channelId: data.channelId,
            }

            try {
                await Message.create(newMessage)
                    .then(async(data) => {
                        await MessageUser.create({
                            MessageId: data.id,
                            UserId: newMessage.userId,
                        })
                    })
                    .then(async(data) => {
                        await ChannelMessage.create({
                            MessageId: data.id,
                            channelId: newMessage.channelId,
                        })
                    })
                io.to(newMessage.channelId).emit('new-message', newMessage)
            } catch (err) {
                console.log(err)
            }
        })
    })
}