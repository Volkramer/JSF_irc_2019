const {
    sequelize,
    User, // NO CARE
    Message,
    MessageUser,
    Channel,
    ChannelUser,
    ChannelMessage,
} = require('../models')

module.exports = function(io) {
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

        socket.on('join-channel', async(data) => {
            const newChannel = {
                name: data.name,
            }
            const user = {
                id: data.userId,
            }
            try {
                await Channel.findAll({
                    where: {
                        name: newChannel.name,
                    },
                }).then(async(data) => {
                    console.log(data)
                    if (data == undefined || data.length == 0) { // CA A LAIR BON AUSSI
                        console.log("Channel doesn't exist!")
                            /* try {
                                await Channel.create(newChannel).then(
                                    async (data) => {
                                        await ChannelUser.create({
                                            ChannelId: data.id,
                                            UserId: user.id,
                                        })
                                        socket.join(newChannel.name)
                                    }
                                )
                            } catch (err) {
                                console.log(err)
                            } */
                    } else {
                        await ChannelUser.create({
                            ChannelId: data[0].id,
                            UserId: user.id,
                        })
                        socket.join(newChannel.name)
                    }
                })
            } catch (err) {
                console.log(err)
            }
        })

        socket.on('leave-channel', async(data) => { // CA A LAIR BON
            const channel = {
                id: data.channelId,
                name: data.channelName,
            }
            const user = {
                id: data.userId,
            }
            try {
                await ChannelUser.findAll({
                    where: {
                        channelId: channel.id,
                        userId: user.id,
                    },
                }).then((data) => {
                    data.forEach(async(element) => {
                        await element.destroy()
                    })
                })
            } catch (err) {
                console.log(err)
            }
            socket.leave(channel.name)
        })

        socket.on('disconnect', function() {
            // Tu dois push un message dans la DB ( USERNAME HAS DISCONNECT)
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
                await Message.create(newMessage).then(async(data) => { // CA A LAIR BON
                    await MessageUser.create({
                        MessageId: data.id,
                        UserId: newMessage.userId,
                    }).then(async(data) => {
                        await ChannelMessage.create({
                            MessageId: data.MessageId,
                            ChannelId: newMessage.channelId,
                        })
                    })
                })

                io.to(newMessage.channelId).emit('new-message', newMessage)
            } catch (err) {
                console.log(err)
            }
        })
    })
}