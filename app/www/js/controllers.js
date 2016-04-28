
angular.module('app.controllers', [])

.controller('loginPageCtrl', function($scope) {

})

.controller('registerCtrl', function($scope) {

})

.controller('drawesomeCtrl', function($scope) {

})

.controller('myProfileCtrl', function($scope) {

})

.controller('moreInformationCtrl', function($scope) {

})

.controller('mainCtrl', function($scope, getLocationService) {

    $scope.getPosition = function(position) {
      $scope.position = getLocationService.getLocation(position);
      $scope.initMap($scope.position.latitude, $scope.position.longitude);
      console.log($scope.position);
      $scope.$apply();

    }
    $scope.position = navigator.geolocation.watchPosition($scope.getPosition);
    $scope.initMap = function(lat,lng) {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat, lng: lng},
        zoom: 15
      });
      var infoWindow = new google.maps.InfoWindow({map: map});

      $scope.$apply();
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    }



})

.controller('createBoardCtrl', function($scope) {

})

.controller('boardCtrl', function($scope) {

})
