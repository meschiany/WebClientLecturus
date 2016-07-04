'use strict';

angular.module('myApp.contribute', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contribute/:videoId', {
    templateUrl: 'pages/contribute.html',
    controller: 'ContributeCtrl'
  });
}])

.controller('ContributeCtrl', function($scope, $rest, $routeParams, $user) {

        //get user data
        $rest.open("user", "get").setFilters({token:$user.getToken()})
                .get(function(res){
                    
                   $scope.userId = res.data.data[0].id;
           console.log(  $scope.userId);
        });
        
        $scope.getPosts = function(){
            
            $rest.open("content", "get_content").setFilters({video_id:$routeParams.videoId}).get(
                  function(res){
                      
                      
                     $scope.posts = res.data.data;
                     
                     //$scope.posts.push({content_type:"image", url:"http://icons.iconarchive.com/icons/pelfusion/flat-file-type/512/jpg-icon.png", name:"file name"});
                     
                     setTimeout(function(){
                         
                         $("#postList").scrollTop($("#postList")[0].scrollHeight); 
                     },1); 
                      
                  },function(){
                      
                      
                  }); 
            
            
        };
       
        
        $scope.getPosts();
        
        $scope.sendPost = function(){
            
            if($scope.postText == undefined || $scope.postText.length <= 0){
                
                alert("please insert a comment");
                return;
            }
            
          $rest.open("text", "new").setAttrs({content:$scope.postText, video_id:$routeParams.videoId, second:5}).get(
                  function(res){
                      
                      $scope.postText = "";
                      $scope.getPosts();
                      
                  },function(){
                      
                      
                  }); 
        };
        
        $scope.uploadFile = function(input){
            
            
            var file = input.files[0];
            if(file == undefined){
                console.log("no file selected");
                return;
            } 
                
            var formData = new FormData($("#data")[0]);
                /*formData.append('file', file);
                formData.append('video_id',$routeParams.videoId);
                //formData.append('token',token);
            
            $.post("http://52.23.174.169:3000/post/put_file?video_id="+$routeParams.videoId+"&debug=true", formData, function(res){
                
                input.files[0] = null;
               console.log(res); 
            });*/
            
            
            $.ajax({
              url: "http://52.23.174.169:3000/post/put_file?video_id="+$routeParams.videoId+"&token="+$user.getToken(),
              type: 'POST',
              data: formData,
              async: false,
              cache: false,
              contentType: false,
              processData: false,
              success: function (returndata) {
                $scope.getPosts();
              }
            });
            
            /*$rest.open("post", "put_file")
                    .postFile(formData, function(res){
                        
                        console.log(res);
            });*/
            
            
        }
        
        $scope.getDateDisplay = function(datestring){
            
            var d = new Date(datestring);
        
            return d.getMinutes()+":"+d.getHours()+", "+d.getDate()+"/"+d.getMonth();
        }

        $scope.getFileName = function(url){
            
            var p = url.split("/");
            var a = p[p.length-1].split(".");
            return a[0];
        }
        
         setInterval($scope.getPosts, 1000);
        

});