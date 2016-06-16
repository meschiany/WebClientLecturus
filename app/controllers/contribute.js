'use strict';

angular.module('myApp.contribute', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contribute/:videoId', {
    templateUrl: 'pages/contribute.html',
    controller: 'ContributeCtrl'
  });
}])

.controller('ContributeCtrl', ['$scope', '$rest', '$routeParams', function($scope, $rest, $routeParams) {
        
        $scope.getPosts = function(){
            
            $rest.open("text", "get").setFilters({video_id:$routeParams.videoId}).get(
                  function(res){
                      
                     $scope.posts = res.data.data;
                     
                  },function(){
                      
                      
                  }); 
            
        };
        
        $scope.getPosts();
        
        $scope.sendPost = function(){
            
          $rest.open("text", "new").setAttrs({content:$scope.postText, video_id:$routeParams.videoId, second:5}).get(
                  function(res){
                      
                      $scope.postText = "";
                      $scope.getPosts();
                      
                  },function(){
                      
                      
                  }); 
        };

}]);