var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Channel = require('./channels.js');
var User = require('./users.js');

var users = [];
var channels = [];

http.listen(3000, function() {
  console.log('listening on port 3000');
});

io.on('connection', function(socket) {
  var user = new User(socket, 'anonymous');
  var address = user.socket.request.connection.remoteAddress;
  var socketID = user.socket.id;

  users.push(user);
  console.log('user ' + address + ' connected. Socket ID: ' + socketID);

  socket.on('nickname', function(nickname) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].socket.id === socket.id) {
        users[i].nickname = nickname;
        user.nickname = nickname;
        console.log(
          'user ' + user.socket.id + 'change his nickname for ' + nickname
        );
      }
    }
  });

  socket.on('join-channel', function(channelName) {
    for (let i = 0; i < channels.length; i++) {
      if (channels[i].name === channelName) {
        channels[i].addUser(user);
        console.log(channels);
        console.log('\n');
        return;
      }
    }
    channel = new Channel(channelName, user);
    channels.push(channel);
    channel.addUser(user);
    console.log(channels);
    console.log('\n');
  });

  socket.on('disconnect', function() {
    for (let i = 0; i < users.length; i++) {
      if (users[i].socket.id === socket.id) {
        users.splice(i, 1);
      }
    }
    console.log('user ' + socketID + ' disconnected.');
  });

  /* client.on('new-message', message => {
    socket.emit('new-message', message);
    console.log(message);
  }); */
});
