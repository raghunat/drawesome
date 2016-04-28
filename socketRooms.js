'use strict';
var http = require('http');
var express = require('express');


var server = express();
var fullServer = http.Server(server);
var io = require('socket.io')(fullServer);

/*****************
// On client side,
// Include socket.io
<script src="/socket.io/socket.io.js"></script>
// js code
var socket = io();
socket.on('connection', function(userId, socket) {
  // When joining room
  socket.emit('joinRoom', roomId)

  // When creating new room, will auto set user namespace
  socket.emit('createRoom');
});

  // Be able to recieve 'sendAllStrokes from current namespace'
  socket.on('sendAllStrokes', function(allStrokes) {
    // Function that compares serverAllstrokes with clientAllStrokes
    // New strokes will be drawn
  });

  // After every stroke, send to allStrokes
  socket.emit('sendNewStroke', newStroke);
});
*****************/
// On login should connect user
io.on('connection', function (userId, socket) {
  var socketUser = userId;
  var socketRoom = '';

  socket.on('joinRoom', function(roomId){
    socketRoom = roomId;
    socket.join(roomId);
  });
  socket.on('createRoom', function(){
    // Function to create room
    // function checkRoomIds () {
    //  when(roomIds[i] == available) {
    //   createRoom(i);
    //  }
    // }
    // Return roomId to user
    socketRoom = roomId;
    socket.join(roomId);
  });
});
/************
//On created room
// Every 500ms, send users all strokes
setInterval(function() {
  socket.emit('sendAllStrokes', allStrokes);
}, 500);

socket.on(sendNewStroke', function(newStroke){
  allStrokes.push(newStroke);
});
************/
fullServer.listen(3000, function(){
  console.log('Listening on port 3000');
});
