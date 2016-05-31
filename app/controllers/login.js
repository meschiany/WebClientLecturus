'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'pages/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', ['$scope', '$rest', function($scope, $rest) {
        
        $scope.user = {};
        
        $scope.login = function(){
            
            $rest.open('user','auth')
                    .setAttrs($scope.user)
                    .get(function(data){
                        
                        
            }, function(){
                
            });
            
        };

}]);