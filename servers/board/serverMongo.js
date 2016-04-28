// var Board = require('./db/app/models/board');
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://hann4024:nHannmann@ds021671.mlab.com:21671/hannmann321';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected correctly to the server.');
  db.close();
});


var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded







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

    var postBoard = function(db, callback) {
      db.collection('allBoards').insertOne( {
        //Used to make a new board with the credentials of
        //Kyle = name, and allBoards = theme
        'name': req.body.name,
        'theme': req.body.theme
      }, function(err, result) {
        assert.equal(err, null);
        console.log('You created a board into the Boards collection.');
        callback(null, result);
      });
    };


    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      postBoard(db, function(err, doc) {
          db.close();
          res.json(doc);
      });
    });
  });



//http://localhost:3000/boards?filters[theme]=fredonia&&filters[name]=nick
app.get('/boards', function (req, res) {

    console.log('get boards by filter');
    var filters = req.query.filters;
    var filterName = filters.name;
    var filterTheme = filters.theme;

    var getBoard = function(db, callback) {
      var cursor = db.collection('allBoards').find({"name": filters.name, "theme": filters.theme});
      cursor.each(function(err, doc) {
        assert.equal(err, null);
        if(doc != null) {
          console.dir(doc);
          console.log('Found desired Board.\n');
          callback(null, doc);
        } else {
          callback();
        }
      });
    };

    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      getBoard(db, function(err, doc) {
          db.close();
          res.json(doc);
      });
    });

});


app.put('/boards/:_id', upload.array(), function (req, res, next) {
    var queryId = req.body._id;
    console.log(queryId);

    var updateBoard = function(db, callback) {
       db.collection('allBoards').updateOne(
          {_id : ObjectID(req.params._id) },
          {
            $set: {
              "name": req.body.name,
              "theme": req.body.theme
           },
            $currentDate: { "lastModified": true }
          }, function(err, results) {
        if( err || !results ) console.log("User not updated");
        else console.log("User updated");
          console.log(results);
          callback(null, results);
       });
    };

    // Weird behavior happens if you  doesn't add options {} says stackoverflow
    // db.update(query, update, options, callback)
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      updateBoard( db, function(err, doc) {
          db.close();
          res.json(doc);
      });
    });

});

//WORKING
app.get('/boards/:_id', function (req, res) {

    var idQuery = req.body._id;

var getBoardID = function(db, callback) {
    var cursor = db.collection('allBoards').find({_id : ObjectID(req.params._id)});
    cursor.each(function(err, doc) {
      assert.equal(err, null);
      if(doc != null) {
        console.dir(doc);
        console.log('Found desired Board.\n');
        callback(null, doc);
      } else {
        callback();
      }
    });
  };


    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      getBoardID(db, function(err, doc) {
          db.close();
          res.json(doc);
      });
    });

});
//WORKING
app.delete('/boards/:_id', function (req, res) {
  var queryId = req.params.id;
  console.log(queryId);
  var deleteBoard = function(db, callback) {
     db.collection('allBoards').deleteOne(
        { _id : ObjectID(req.params._id) },
        function(err, results) {
           console.log(results);
           callback(null, results);
        }
     );
  };

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    deleteBoard(db, function(err, doc) {
        db.close();
        res.json(doc);
    });
  });
});

// The server port
var port = 3000;

app.listen(port, function () {
    console.log("API has started");
    console.log("Listening on port ", port);
});
