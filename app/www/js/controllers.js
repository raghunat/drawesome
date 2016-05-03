angular.module('app.controllers', [])

.controller('loginPageCtrl', function($scope) {

})

.controller('registerCtrl', function($scope,$http,$location) {

    $scope.registerUser = function(isValid){
      //test if passwords match

      if(isValid){
        //create a user object
        var user= {
          name: $scope.name,
          email: $scope.email,
          phone: $scope.phone,
          username: $scope.username,
          password: $scope.password
        };
        //not sure about what to do on these functions
        function successCallback(user){
          $scope.user = user;
          $location.path('/login');
        }
        function errorCallback(error){
          $scope.error = error;

        }

        //it makes the post call to the server (working)
        $http.post('http://localhost:8081/users',user)
          .success(successCallback)
          .error(errorCallback)

      }
    }
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
