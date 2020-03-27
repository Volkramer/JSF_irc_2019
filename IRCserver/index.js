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
  var address = socket.request.connection.remoteAddress;
  var socketID = socket.id;
  user = new User(socket, 'anonymous');
  console.log('user ' + address + ' connected. Socket ID: ' + socketID);

  socket.on('nickname', function(nickname) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].socket.id === socket.id) {
        users[i].nickname = nickname;
      }
      return;
    }
  });

  socket.on('join-channel', function(channelName) {
    for (let i = 0; i < channels.length; i++) {
      if (channels[i].name === channelName) {
        channels[i].addUser(user);
      }
      return;
    }
    channel = new Channel(channelName, user);
    channel.addUser(user);
    channels.push(channel);
    console.log(channels);
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
