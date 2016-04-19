angular
  .module('myApp')
  .controller('TestCtrl', function ($scope, Boards) {
    Boards.getBoards(function (err, boards) {
      if (err) {
        console.error(err);
        return alert('An error occured.');
      }
      $scope.boards = boards;
    });
  });
