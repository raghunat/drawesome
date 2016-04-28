// npm install express
// npm install socket.io

var express = require('express');
var server = express();
server.use(express.static('www'));
server.listen(3000);
