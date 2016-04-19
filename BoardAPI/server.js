var Datastore = require('nedb'),
  db = new Datastore();
var Board = require('./db/app/models/board');
var express = require('express');
var app = express();


var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

db.boards = new Datastore({
  filename: './db/boards.db',
  autoload: true
});

//WORKING
app.get('/', function (req, res) {
  res.send("Welcome to our api");
});


//WORKING
app.post('/boards', upload.array(), function (req, res, next) { //working
  var board = {
    name: req.body.name,
    theme: req.body.theme
  };
  db.boards.insert(board, function (err, newBoard) {
    console.log(newBoard);
    res.send(newBoard);

  });
});



//find boards by filters
//WORKING
//http://localhost:3000/boards?filters[theme]=fredonia&&filters[name]=Tom
app.get('/boards', function (req, res) {

  console.log('get boards by filter');
  var filters = req.query.filters;

  // We need to consider requests without filters
  // filters !== undefined compares the filters type

  if (filters.name && filters.theme) {
    var filterName = filters.name;
    var filterTheme = filters.theme;
    db.boards.find({
      $and: [{
        name: filterName
      }, {
        theme: filterTheme
      }]
    }, function (err, docs) {
      if (err)
        throw err;
      //docs return the matches
      res.send(docs);
    });
  } else if (filters.theme) {
    var filterTheme = filters.theme;
    db.boards.find({
      theme: filterTheme
    }, function (err, docs) {
      if (err)
        throw err;
      //docs return the matches
      res.send(docs);


    });
  } else if (filters.name) {
    var filterName = filters.name;
    db.boards.find({
      name: filterName
    }, function (err, docs) {
      if (err)
        throw err;
      res.send(docs);
    });
  }
});



//WORKING
app.put('/boards/:_id', upload.array(), function (req, res, next) {
  var queryId = req.params;
  console.log(queryId);


  // Weird behavior happens if you  doesn't add options {} says stackoverflow
  // db.update(query, update, options, callback)
  db.boards.update(queryId, {
    $set: {
      name: req.body.name,
      theme: req.body.theme
    }
  }, {
    returnUpdatedDocs: true
  }, function (err, numReplaced, affectedDoc) {
    if (err)
      throw err;

    res.send(affectedDoc);
  });
});

//WORKING
app.get('/boards/:_id', function (req, res) {
  //similar to post but just uses the id (req.params.id) instead of filters
  var idQuery = req.params;
  db.boards.find(idQuery, function (err, docs) {
    if (err)
      throw err;
    res.send(docs);
  });

});
//WORKING
app.delete('/boards/:_id', function (req, res) {
  db.boards.remove(req.params, {}, function (err, numRemoved) {
    if (err)
      throw err;
    res.send("Object " + numRemoved + " was successfully removed");
  });
});

// The server port
var port = 3000;

app.listen(port, function () {
  console.log("API has started");
  console.log("Listening on port ", port);
});
