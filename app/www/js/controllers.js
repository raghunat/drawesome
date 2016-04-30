angular.module('app.controllers', [])

.controller('loginPageCtrl', function($scope) {

})

.controller('registerCtrl', function($scope) {

})

.controller('drawesomeCtrl', function($scope) {

})

.controller('myProfileCtrl', function($scope, $http) {
  //When profile opens... run this...

  $scope.loadingUser = true;
  $http.get('http://localhost:8081/users/c9suHUY5myxN8OE7')
  .success(function(users){
    $scope.username = users.username;
    $scope.firstName = users.firstname;
    $scope.lastName = users.lastname;
  })
  .error(function(error){
    $scope.error = error;
  })
  .finally(function(){
    $scope.loadingUser = false;
  });
})

.controller('moreInformationCtrl', function($scope) {

})

.controller('mainCtrl', function($scope) {

})

.controller('createBoardCtrl', function($scope) {

})

.controller('boardCtrl', function($scope) {

})
