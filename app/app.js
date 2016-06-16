'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.registration',
  'myApp.version',
  'myApp.login',
  'myApp.editVideo',
  'myApp.contribute',
  'myApp.openVideoSessions',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
