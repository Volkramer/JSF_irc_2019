var Channel = require("./objects/channels");
var User = require("./objects/users");
var Message = require("./objects/messages");

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
          socket.join(channels[i].name);
          channels[i].addUser(user);
          console.log(channels);
          console.log("\n");
          return;
        }
      }
      channel = new Channel(channelName, user);
      channels.push(channel);
      socket.join(channel.name);
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

    socket.on("new-message", data => {
      channel = function() {
        for (let i = 0; i < channels.length; i++) {
          if (channels[i].name === data.channelName) {
            return channels[i];
          }
        }
      };
      user = function() {
        for (let i = 0; i < channel.users.length; i++) {
          if (channel.users[i].nickname === data.nickname) {
            return channel.users[i];
          }
        }
      };
      message = new Message(data.content, user, channel);
      io.to(message.channel.name).emit(
        "new-message",
        message.dateTime + " " + message.user.nickname + ": " + message.content
      );
    });
  });
};
