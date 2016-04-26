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
		console.log('New User joined the chat');// from ' + sock.remoteAddress + ': ' + data);
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
	//
	// data.on ('yes poll', function(poll){
	// 	for (var i = 0; i < polls.length; i++) {
	// 		if(poll.text === polls[i].text) {
	// 			poll.yeses++;
	// 			break;
	// 		}
	// 	}
	// 	sock.emit('update polls', polls);
	// });

	data.on('disconnect', function(){
		sock.emit('member leave', socketUser);
	});

	// data.on('incoming poll', function(poll){
	// 	$scope.users.push(poll);
	// 	$scope.$apply();
	// });
	//
	// data.on('newPoll', function(pollQuestion){
	// 	let pool ={
	// 		text: pollQuestion,
	// 		yeses: 0,
	// 		nos: 0
	// 	};
	// 	polls.push(poll);
	// 	sock.emit('incoming poll', poll)
	// });
	//
	// $scope.yesPoll = function(poll){
	// 	data.emit('yes poll', poll);
	// };
	// $scope.noPoll = function(poll){
	// 	data.emit('no poll', poll);
	// };
//
	// data.on('message like', function(clientMessage){
  //   var message = serverMessages.find(function(serverMessage){
  //     if (serverMessage.name === clientMessage && serverMessage.message===clientMessage.message){
  //       return serverMessage;
  //     }
  //   });
  //   var alreadyLiked= false;
  //   for (var i = 0; i < message.likes.length; i++){
  //     if(messge.likes[i]=== socketUser){
  //       alreadyLiked = true;
  //     }
  //   }
  //   if(!alreadyLiked){
  //     message.likes.push();
  //     io.emit('update likes', message);
  //   }
  // });

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
