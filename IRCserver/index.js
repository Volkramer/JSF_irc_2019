var app = require('express')();
var http = require('http').createServer(app);

http.listen(3000, function() {
  console.log('listening on port 3000');
});
