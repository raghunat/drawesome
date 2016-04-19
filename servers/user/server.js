var express = require('express');
var app = express();
path = require('path');
var Datastore = require('nedb'),
  // Create/Initialize Database
  // (Created as persistent storage, this will create database
  // as a file named 'users' (no file extension)
  userdb = new Datastore({
    filename: 'users.nedb'
  });

var crypto = require('crypto');
// use one-way hashing algorithm
// Will need to encrypt password with a hashing algorithm
function hashPassword(user) {
  var pass = user["password"];
  var key = '8Jbn0pe26Aa';
  user.password = crypto.createHmac('sha1', key).update(pass).digest('hex');
  return user;
};

userdb.loadDatabase();

// middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// **** Routes ****

// POST to create new users
app.post('/users', function (req, res) {
  console.log("Got a POST request for a new user");
  //take the information from the body defined at POSTMAN
  req.on("data", function (chunk) {
    //take the string and transform in a JSON object
    var query = JSON.parse(chunk);
    query = hashPassword(query);
    console.log(query);
    // insert
    userdb.insert(query);

  });

  // Will need to encrypt password with a hashing algorithm

  // Send response back
  res.send('Added user');

})

// GET request for listing users?
app.get('/users', function (req, res) {
  console.log("Got a GET request for all users");
  // Provide list of all users (using filters or not)

  //query takes everything after ?
  //example 1: localhost:8081/users?firstname=bob&password=12345
  //example 2: localhost:8081/users?firstname=bob
  //example 3: localhost:8081/users
  var query = require('url').parse(req.url, true).query;

  //query is an array with the filters to be used
  //if there's no filter (Ex: localhost:8081/users) query will be empty {} so every record will be returned
  userdb.find(query, function (err, users) {
    // users is an array containing all user objects
    res.send(users);
  });

})


// GET request for a single user by id #
app.get('/users/:id', function (req, res) {
  console.log("Got a GET request for an individual user");

  userdb.findOne({
    _id: req.params.id
  }, function (err, doc) {
    res.send(doc);
  });
})


// PUT request for a user update
app.put('/users/:id', function (req, res) {
  console.log("Got a PUT request for update");

  console.log(req.params.id);
  //get info from body
  req.on("data", function (chunk) {
    //take the string and transform in a JSON object
    var query = JSON.parse(chunk);
    console.log(query);
    // Update entry in DB
    //$set change the entry instead of replace
    userdb.update({
        _id: req.params.id
      }, {
        $set: query
      }, {
        multi: true
      },
      function (err, numReplaced) {
        if (err) throw err;
        console.log('Updated ' + numReplaced + ' records');
      });
  });
  // Send response back
  res.send('Updated user');
})


// DELETE request for a user by id
app.delete('/users/:id', function (req, res) {
  userdb.remove({
      _id: req.params.id
    }, {
      multi: true
    },
    function (err, numRemoved) {
      if (err) throw err;
      console.log("Got a DELETE request for user by id");
      res.send(numRemoved + ' User deleted');
    });
})


// Set up server to listen on a port
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
