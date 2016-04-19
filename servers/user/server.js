//******************************************************************************
//**************************  INCLUDE MODULES **********************************
//******************************************************************************
var express = require('express');
var app = express();
path = require('path');
var Datastore = require('nedb');
var crypto = require('crypto');

//******************************************************************************
//**************************  INITIALIZE DATABASE ******************************
//******************************************************************************
  // Create/Initialize Database
  // (Created as persistent storage, this will create database
  // as a file named 'users' (no file extension)
  userdb = new Datastore({
    filename: 'users.nedb'
  });
  userdb.loadDatabase();

//**** Functions ****

//******************************************************************************
//************************** HASH FUNCTIONS ************************************
//******************************************************************************
// use one-way hashing algorithm
// Will need to encrypt password with a hashing algorithm

// Specific hash for initial user creation
function hashPassword(user) {
  var pass = user["password"];
  var key = '8Jbn0pe26Aa';
  user.password = crypto.createHmac('sha1', key).update(pass).digest('hex');
  return user;
};

// Hash only the password. Pass plain text password in and return
// hashed password value
function hashOnlyPassword(input) {
  var pass = input;
  var key = '8Jbn0pe26Aa';
  hash = crypto.createHmac('sha1', key).update(pass).digest('hex');
  return hash;
};

//******************************************************************************
//**************************  MIDDLEWARE ***************************************
//******************************************************************************

app.use(require('body-parser').urlencoded({extended:true}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//***  Routes ***

//******************************************************************************
//**************************  POST REQUESTS ************************************
//******************************************************************************

// POST request for Login form
app.post('/login', function (req, res){
  console.log("Received POST request.");
  //Check to see if there is actual input for both fields
  if (req.body.username && req.body.password) {
    //Hash the input password
    var hash = hashOnlyPassword(req.body.password);

      userdb.findOne({ username: req.body.username }, function (err, doc) {
        //First check to see if user is in database
        if (doc == null) {
          //If not, inform the user and proceed no further
          console.log("User not found.");
          res.status(404).send("User not found.");
        }
        else if (doc.password === hash) {
          //Return object to console
          console.log("Successful Login.");
          console.log(doc);
          //TODO Perform some other Login actions
              //Redirect to some profile or homepage
              //Start a Session?

          //Inform user of successful login
            res.json(doc);
        }
      else {
        //if password doesn't match, do not login
        console.log("Password does not match. Could not log in.");
        res.status(403).send("Password does not match. Could not log in.")
      }
      });
  }
  //If fields are not filled out, inform user and proceed no further
  else {
    console.log("One or both fields are empty.");
    res.status(400).send("One or both fields are empty.");
  }
});

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
  // Send response back
  res.send('Added user');
})

//******************************************************************************
//**************************  GET REQUESTS *************************************
//******************************************************************************

// GET request for Login page
app.get('/', function (req, res) {
  console.log("Received GET request from index.html");
  res.sendFile(__dirname + '/index.html');
});

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

//******************************************************************************
//**************************  PUT REQUESTS *************************************
//******************************************************************************

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

//******************************************************************************
//**************************  DELETE REQUESTS **********************************
//******************************************************************************

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

//******************************************************************************
//**************************  SERVER INFORMATION *******************************
//******************************************************************************

// Set up server to listen on a port
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
