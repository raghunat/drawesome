//Server.js

//Get the third party helper
var express = require('express');

//Create a server instance
var server = express();

//Configure the server
server.use(express.static('www'));

//Make the server stay alive and listen for requests
server.listen(3001);
