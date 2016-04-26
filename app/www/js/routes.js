angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



  .state('loginPage', {
    url: '/login',
    templateUrl: 'templates/loginPage.html',
    controller: 'loginPageCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  .state('drawesome', {
    url: '/splash',
    templateUrl: 'templates/drawesome.html',
    controller: 'drawesomeCtrl'
  })

  .state('myProfile', {
    url: '/profile',
    templateUrl: 'templates/myProfile.html',
    controller: 'myProfileCtrl'
  })

  .state('moreInformation', {
    url: '/info',
    templateUrl: 'templates/moreInformation.html',
    controller: 'moreInformationCtrl'
  })

  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    controller: 'mainCtrl'
  })

  .state('createBoard', {
    url: '/create',
    templateUrl: 'templates/createBoard.html',
    controller: 'createBoardCtrl'
  })
  .state('board', {
    url: '/board',    
    templateUrl: 'templates/board.html',
    controller: 'boardCtrl'
  })

//Loads index.html
$urlRouterProvider.otherwise('/')



});
