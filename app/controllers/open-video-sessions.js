'use strict';

angular.module('myApp.openVideoSessions', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/openVideoSessions', {
    templateUrl: 'pages/openVideoSessions.html',
    controller: 'OpenVideoSessionsCtrl'
  });
}])

.controller('OpenVideoSessionsCtrl', ['$scope', '$rest', function($scope, $rest) {
        
        $scope.getOpenVideos = function(){
            
            $rest.open("video", "get_live_videos").setFilters({status:"RECORDING"}).get(
                  function(res){
                      
                     $scope.videos = res.data.data;
                     
                  },function(){
                      
                      
                  }); 
            
        };
        
        $scope.getOpenVideos();
        
        setInterval(function(){
            
            $scope.getOpenVideos();
        }, 1000);

}]);