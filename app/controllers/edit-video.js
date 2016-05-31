/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

angular.module('myApp.editVideo', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/editVideo', {
    templateUrl: 'pages/editVideo.html',
    controller: 'editVideoCtrl'
  });
}])

.controller('editVideoCtrl', ['$scope', '$rest', function($scope, $rest) {
        
        /**
         * this will hols all data by sec key value
         * 
         * for example in the forth second there is a comment
         * 
         * 
         * $videoStreamData[4] = [{'type':"comment", "text":"testing..."];
         */
        var videoStreamData = [];
        videoStreamData[4] = videoStreamData[0] = [{'type':"comment", "text":"testing..."}];
        
        var videoPlayer = document.getElementById("myVideo");
        
        var currSec = -1;
        
        /**
         * @type Object
         */
       $scope.displayStack = {};
        
        //data display service
        var videoContentDisplayService = setInterval(function(){
            
            // we are still in same second
            if(currSec == parseInt(videoPlayer.currentTime)) return;
            
           currSec = parseInt(videoPlayer.currentTime);
           
           // check if there is content
           if(videoStreamData[currSec] != undefined && videoStreamData[currSec].length > 0){
               
               // push all to stack
               for(var i=0; i < videoStreamData[currSec].length; i++){
                   
                   var content = videoStreamData[currSec][i];
                   if($scope.displayStack[content.type] == undefined) $scope.displayStack[content.type] = [];
                   $scope.displayStack[content.type].push(content);
               }
           }
            
            console.log($scope.displayStack );
            console.log(videoStreamData[currSec]);
        }, 1000);
        
        

}]);