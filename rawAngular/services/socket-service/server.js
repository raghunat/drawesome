"use strict";
 var express = require('express');
 var server = express();
 var http= require('http');

 var HOST = '127.0.0.1';
 var PORT = 3000;
 var fullServer= http.Server(server);
 var sock= require('socket.io')(fullServer);
 var serverMessage = [];
 var serverStroke = [];
 server.get('/',function(req,res){
 	res.sendFile(__dirname+'/test.html')
 });
 server.get('/strokes.js',function(req,res){
   res.sendFile(__dirname+'/strokes.js')
 });
 server.get('/canvas.js',function(req,res){
   res.sendFile(__dirname+'/canvas.js')
 });
 server.get('/canvas.directive.js',function(req,res){
   res.sendFile(__dirname+'/canvas.directive.js')
 });

 sock.on('connection', function(data) {
 	console.log('New User joined the chat');
 		let socketUser = '';
 		data.on('chat message', function (messageObj){
 			console.log(messageObj);
 			serverMessage.push(messageObj);
 			sock.emit('new message', messageObj);
 		});

 	data.on('log in', function(username){
 		socketUser = username;
 		console.log(username + " joined the room");
 		sock.emit('new member', username);
    sock.emit('receive strokes', serverStroke);
 	});

 	data.on('disconnect', function(data) {
 		console.log('A user left the chat.');
 		sock.emit('member leave', socketUser);
 	});

 // 	data.on('disconnect', function(){
 // 		sock.emit('member leave', socketUser);
 // 	});

 	data.on('draw stroke', function(data) {
      serverStroke.push(data);
      sock.emit('receive strokes', data);
 	});

 	data.on('user boot', function(data) {
 		console.log('A User has been booted from the room');
 		sock.emit('remove user', data);
 	});

 	data.on('board close', function(data) {
 		console.log('The board has now been closed');
 	});
 });

 fullServer.listen(PORT, function(){
 	console.log('Listening using the latin word for function');
 });
