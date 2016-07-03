/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard/', {
    templateUrl: 'pages/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])

.controller('DashboardCtrl', function($scope, $rest, $routeParams, $user) {
        

                var vit = {};
			function getToken(){
                            try{
				return $user.getToken();
                            }catch(err){
                                
                                window.location = "#login";
                            }
			}

			function setContentVits(){
                            var data = vit.vits;
                            var curStatus;
                            for (var i = 0; i < data.length; i++) {
                             if (curStatus != data[i].status){
                              curStatus = data[i].status;
                              $("#vits").append("<div style='font-size: 20px;margin-top: 40px;font-weight: 300;color: #999;width: 100%;'>"+curStatus+"</div>"); 
                              $("#vits").append("<div class=lineSep style='margin:5px 0 10px 0;'></div>");
                             }else{
                              $("#vits").append("<div class=lineSep></div>");
                             }
                             if (curStatus == "RECORDING"){
                              $("#vits").append("<a href=#/contribute/"+data[i].id+">"+data[i].title+"</a>");
                             }else{
                              $("#vits").append("<a href=#/editVideo/"+data[i].id+">"+data[i].title+"</a>");
                             }
                            } 
                        }

			function setCourseVideos(id){
				var data = vit.courses.videos;
				$("#courseVideos").html("");
				for (var i = 0; i < data.length; i++) {
					if (data[i].course_id == id){
						var date = new Date(data[i].updated_at)
						var d = new Date(data[i].updated_at)
						d = [(date.getDate()), (date.getMonth()+1), date.getFullYear()].join('/');
						d = d + " " + [(date.getHours()), (date.getMinutes()+1)].join(':');
						$("#courseVideos").append("<div class=lineSep></div>");
						$("#courseVideos").append("<a href='vitPlayer.html?videoId="+data[i].id+"' style='cursor:pointer;' course_id="+data[i].id+">"+data[i].title+" - <span style='font-size:10px;'>Last modified: <span style='font-size:10px;color:rgb(42, 191, 213);'>"+d+"</span></span></a>");	
					}
				}
			}

			function setContentCourses(){
				var data = vit.courses.courses;
				for (var i = 0; i < data.length; i++) {
					$("#courses").append("<div class=lineSep></div>");
					$("#courses").append("<span class='course' style='cursor:pointer;' course_id="+data[i].id+">"+data[i].name+"</span>");
				}

				$(".course").mouseenter(
					function(){
						$("#courseVideosOverlay").css("opacity","1");
						setCourseVideos($(this).attr("course_id"));
					}).mouseleave( 
					function(){
						
					});
			}

			function getVits(){
				var formData = {	
	        		'token'       : getToken(),
	    		};

	    		var posting = $.get( consts.SERVER+"/video/get", formData );
	    		posting.error(function(){
	    			$("#noToken").css("display","block");
	    		});
				//TODO on server if token is invalid redirect to login page
				posting.done(function( data ) {
					console.log(data);
					if (data.status == "success"){
						vit.vits = data.data;
						setContentVits();
					}
					
				});
			}

			function getCourses(){
				var formData = {	
	        		'token'       : getToken(),
	    		};
				var posting = $.get( consts.SERVER+"/course/getAllWithVideos", formData );
	    		posting.error(function(){
	    			logout();
	    		});
				//TODO on server if token is invalid redirect to login page
				posting.done(function( data ) {
					console.log(data);
					if (data.status == "success"){
						vit.courses = {}
						vit.courses.courses = data.data.courses;
						vit.courses.videos = data.data.videos;
						setContentCourses();
					}
				});
			}

			function logout(){
				window.localStorage.setItem("vitToken","");
				window.location = "#login";
			}

			$(document).ready(function() { 
				
				$(function(){
  					$("#header").load("header.html"); 
				});

				var settingsMenu = false;

				$("#logout").click(function(){
					logout();
				});



				
				$("#db_toggle").click(function(){
					var margin = parseInt($("#db_slide").css("margin-right"));
					if (margin > 0){
						$("#db_slide").css("margin-right","0");
						$("#lblCourses").css('opacity',0);
						$("h1").css("opacity",0);
						$("#vits").css("display","block");
						$("#courses").css("opacity",0);
						setTimeout(function(){
							$("#courses").css("display","none");
							$("#vits").css("opacity",1);
							$("#lblCourses").html("<- My courses");
							$("h1").html("My VIT's");
							$("#lblCourses").css('opacity',1);
							$("h1").css("opacity",1);
							$("#courseVideosOverlay").css("opacity","0");
							$("#courseVideos").html("");
						},500);
					}else{
						$("#db_slide").css("margin-right","50%");
						$("#lblCourses").css('opacity',0);
						$("h1").css("opacity",0);
						$("#courses").css("display","block");
						$("#vits").css("opacity",0);
						setTimeout(function(){
							$("#vits").css("display","none");
							$("#courses").css("opacity",1);	
							$("#lblCourses").html("My Vits ->");
							$("h1").html("My Courses");
							$("#lblCourses").css('opacity',1);
							$("h1").css("opacity",1);
						},500);
					}
				});

				getVits();
				getCourses();

		
			});
});
