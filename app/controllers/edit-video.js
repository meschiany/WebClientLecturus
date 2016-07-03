/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

angular.module('myApp.editVideo', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/editVideo/:videoId', {
    templateUrl: 'pages/editVideo.html',
    controller: 'editVideoCtrl'
  });
}])

.controller('editVideoCtrl', function($scope, $rest, $routeParams, $user) {
        
        try{
            return $user.getToken();
          }catch(err){
                                
             window.location = "#login";
        }
        
        /**
         * this will hols all data by sec key value
         * 
         * for example in the forth second there is a comment
         * 
         * 
         * $videoStreamData[4] = [{'type':"comment", "text":"testing..."];
         */

          window._videoId = $routeParams.videoId;

        var videoStreamData = [];
        videoStreamData[4] = videoStreamData[0] = [{'type':"comment", "text":"testing..."}];
        
        var videoPlayer = document.getElementById("vitPlayer");
        
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
        


        var lecturus = lecturus || {}; 
        var vit;



        function setVideoSrc(videoId){
            $("#vitPlayer source").attr("src",consts.SERVER+"/uploads/vits/"+_videoId+"/video"+_videoId+".mp4");
           }


        var initCallback = function( data ) {
                contents = data.data;
                console.log(data.data);
                for (var i = 0; i < contents.length; i++) {
                        // contents[i].type="text";
                }
                printData();
                $('video').on("timeupdate", setPreview);
        }

        var updateCallback = function( data ) {
                for (var i = 0; i < contents.length; i++) {
                        if (contents[i].id == data.text_id){
                                for (var key in data){
                                        contents[i][key] = data[key];
                                }
                                break;
                        }
                }
                printData();
        }

        function _getPosts(callback){
                var formData = {	
                        'filters[video_id]' : _videoId,
                        'debug' : true
                };

                var posting = $.get( consts.SERVER+"/content/get_content", formData );

                posting.done(callback);
        }

        function startPlayer(){
                vit = $('video')[0];
                $('video').videoPlayer({
                        'playerWidth' : 0.95,
                        'videoClass' : 'video',
                });
        }

        $(document).ready(function() {
                startPlayer()

                //_videoId = getUrlParameter("videoId");

                setVideoSrc(_videoId);


                _getPosts(initCallback);

        });
        

});