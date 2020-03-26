var app = require('express')()
var http = require('http').createServer(app)
var socket = require('socket.io')(http)

http.listen(3000, function() {
  console.log('listening on port 3000')
})

socket.on('connection', function(client) {
  var address = client.request.connection.remoteAddress
  console.log('user ' + address + ' connected')
  client.on('new-message', message => {
    socket.emit('new-message', message)
    console.log(message)
  })
})
