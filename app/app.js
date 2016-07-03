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
  'myApp.dashboard',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);

myApp.controller("MenuCtrl", function($scope, $user){
    
        $scope.userLoggedIn = function(){
            try{

                $scope.token = $user.getToken();
                  return true;
            } catch(err){

                return false;
            }
        }
        
      $scope.logout = function(){
          
          window.localStorage.setItem("vitToken", "");
          window.location = "#login";
      }
});