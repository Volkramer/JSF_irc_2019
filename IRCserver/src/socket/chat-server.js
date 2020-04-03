const {
    sequelize,
    User, // NO CARE
    Message,
    MessageUser,
    Channel,
    ChannelUser
} = require('../models')

module.exports = function(io) {
    var users = [];
    var channels = [];

    io.on("connection", function(socket) {
        var user = new User(socket, "anonymous");
        var address = user.socket.request.connection.remoteAddress;
        var socketID = user.socket.id;

        users.push(user);
        console.log("user " + address + " connected. Socket ID: " + socketID);

        socket.on("nickname", function(nickname) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].socket.id === socket.id) {
                    users[i].nickname = nickname;
                    user.nickname = nickname;
                    console.log(
                        "user " + user.socket.id + "change his nickname for " + nickname
                    );
                }
            }
        });

        socket.on("join-channel", function(channelName) {
            for (let i = 0; i < channels.length; i++) {
                if (channels[i].name === channelName) {
                    channels[i].addUser(user);
                    console.log(channels);
                    console.log("\n");
                    return;
                }
            }
            channel = new Channel(channelName, user);
            channels.push(channel);
            channel.addUser(user);
            console.log(channels);
            console.log("\n");
        });

        socket.on("disconnect", function() {
            for (let i = 0; i < users.length; i++) {
                if (users[i].socket.id === socket.id) {
                    users.splice(i, 1);
                }
            }
            console.log("user " + socketID + " disconnected.");
        });

        socket.on("new-message", async message => {
            // const newMessage = {
            //   "message"
            //   "username"
            //   "userId"
            //   "channeId"
            // }
            async() => {
                try {
                    await MessageChannel.create(newMessage)
                } catch (err) {
                    console.log(err)
                }
            }
            await io.emit("new-message", message)
            console.log(message);
        });
    });
};