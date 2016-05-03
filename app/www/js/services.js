
angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])
.factory('getLocationService', function() {

  function getLocation(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    return position.coords;
  }
  return {
    getLocation: getLocation
  };
});
