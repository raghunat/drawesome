angular.module('app.controllers', [])

.controller('loginPageCtrl', function($scope) {

})

.controller('registerCtrl', function($scope,$http,$location) {

    $scope.registerUser = function(){
      //test if passwords match
      if($scope.password === $scope.confirmationPassword){
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

      }else{ //check if the else stmt is necessary
        // send the error message
      }


    }

})

.controller('drawesomeCtrl', function($scope) {

})

.controller('myProfileCtrl', function($scope) {

})

.controller('moreInformationCtrl', function($scope) {

})

.controller('mainCtrl', function($scope) {

})

.controller('createBoardCtrl', function($scope) {

})

.controller('boardCtrl', function($scope) {

})
