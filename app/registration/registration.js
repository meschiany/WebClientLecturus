'use strict';

angular.module('myApp.registration', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/registration', {
    templateUrl: 'registration/registration.html',
    controller: 'registrationCtrl'
  });
}])

.controller('registrationCtrl', ['$scope', '$rest', function($scope, $rest) {
        
        $scope.user = {};
        $scope.colleges = ["asdasd"];

        $scope.formSubmit = function(){
            
            $rest.open('user','add')
                    .setAttrs($scope.user)
                    .get(function(data){
                        
                        
            }, function(){
                
            });
            
        };

}]);