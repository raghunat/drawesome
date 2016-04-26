'use strict';
var http = require('http');
var express = require('express');


var server =express();
var fullServer = http.Server(server);
var io = require('socket.io')(fullServer);

server.get('/', function (req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('stroke', function(socket){
  console.log("Stroke");
});

io.on('joinRoom', function(){
  console.log("Someone joined");
});

io.on('createRoom', function(){
  console.log("Room created");
});

fullServer.listen(3000, function(){
  console.log('Listening on port 3000');
});
