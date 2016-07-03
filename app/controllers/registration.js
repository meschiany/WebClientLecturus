'use strict';

angular.module('myApp.registration', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/registration', {
    templateUrl: 'pages/registration.html',
    controller: 'registrationCtrl'
  });
}])

.controller('registrationCtrl', ['$scope', '$rest', function($scope, $rest) {
        
        $scope.user = {};
        

        
        var colleges;
			$(document).ready(function() { 

				$("input[type='email']").on('input',function(e){
  					$(".warning").css("opacity",0);
				});


				function setCollegeList(){
					var posting = $.get( consts.SERVER+"/college/get");

					posting.done(function( data ) {
						console.log(data);
                                                
                                                $scope.$apply(function(){
                                                    
                                                     $scope.colleges = data.data;
                                                });
                                               
						/*for (var i = data.data.length - 1; i >= 0; i--) {
							element = data.data[i]
						
						   	var opt = document.createElement("option");
						   	if (element.name == ""){
						   		continue
						   	}
						   	opt.value= element.id;
						   	opt.innerHTML = element.name; // whatever property it has

						   // then append it to the select element
						   $("#collegeSlct").append(opt);
						}*/
						if (data.status){
							
						}
					});
				}
		
				$("#register").submit(function(event) {

					/* stop form from submitting normally */
					event.preventDefault();

					var formData = {	
		        		'email'       : $('input[name=email]').val(),
		        		'password'    : $('input[name=password]').val(),
		        		'f_name'    : $('input[name=fname]').val(),
		        		'l_name'    : $('input[name=lname]').val(),
		        		'college_id'    : 1
		    		};

		    		var $form = $( this );
					var action = $form.attr( 'action' );

					/* Send the data using post with element id name and name2*/
					var posting = $.get( consts.SERVER+"/user/"+action, formData );

					//TODO on server if token is invalid redirect to login page
					posting.done(function( data ) {
						console.log(data);
						if (data.status == "success"){
							// window.localStorage.setItem("vitToken", data.data.token);
							/*$(".form").css("right","50%");
							$("#regBtn").prop('disabled', true);
							$("#regBtn").css('cursor', "no-drop");
							$("#dlLink").attr("href",data.data.link);
                                                        */
                                                        window.localStorage.setItem("vitToken", data.data.token);
                                                        
                                                        window.location = "#dashboard";
                                                        
						}else{
							$(".warning").css("opacity",1);
						}
					});
				});

				setCollegeList();
			});

}]);