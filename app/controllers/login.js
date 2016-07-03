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
            
            $rest.open('user','login')
                    .setAttrs($scope.user)
                    .get( function(res){
                
                var data = res.data;
                if (data.status == "success"){
                                            
						window.localStorage.setItem("vitToken", data.data.token);
						window.location = "#dashboard"
					}else{
						$(".warning").css("opacity",1);
					}
            }, function(){
                
                $(".warning").css("opacity",1);
            });
            
        };
        

}]);