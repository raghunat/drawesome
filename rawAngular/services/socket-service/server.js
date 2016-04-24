"use strict";
var express = require('express');
var server = express();
var http= require('http');

var HOST = '127.0.0.1';
var PORT = 3000;
var fullServer= http.Server(server);
var sock= require('socket.io')(fullServer);
var serverMessage = [];
server.get('/',function(req,res){
	res.sendFile(__dirname+'/test.html')
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
	});

	data.on('disconnect', function(data) {
		console.log('A user left the chat.');
		sock.emit('member leave', socketUser);
	});

	data.on('disconnect', function(){
		sock.emit('member leave', socketUser);
	});

	data.on('draw stroke', function(data) {
		console.log('A User is now drawing a stroke');
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
