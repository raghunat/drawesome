var App = angular.module('myApp', [])
  .factory('Boards', function($http){
    return {
      getBoards: function (cb) {
        $http.get('http://localhost:3000/boards').success(function (boards) {
          return cb(null, boards);
        }).error(cb);
      },
      getBoardId: function (id, cb) {
        $http.get('http://localhost:3000/boards/' + '9y9sjKGrKQhjSAgr').success(function (boards) {
          return cb(null, boards);
        }).error(cb);
      },
      postBoard: function (params, cb) {
        $http.post('http://localhost:3000/boards').success(function (boards) {
          return cb(null, board);
        }).error(cb);
      },
      putBoard: function (id, params, cb) {
        $http.put('http://localhost:3000/boards/' + '9y9sjKGrKQhjSAgr').success(function (boards) {
          return cb(null, board);
        }).error(cb);
      },
      deleteBoard: function (id, cb) {
        $http.delete('http://localhost:3000/boards/' + '9y9sjKGrKQhjSAgr').success(function (boards) {
          return cb(null, board);
        }).error(cb);
      },
      //...
    };
  })
