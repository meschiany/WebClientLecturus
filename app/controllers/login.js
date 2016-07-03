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
        
        $(document).ready(function() { 

			$("input").on('input',function(e){
  				$(".warning").css("opacity",0);
			});

			$("#login").submit(function(event) {

				/* stop form from submitting normally */
				event.preventDefault();

				var formData = {	
                                    'email'    : $('input[name=email]').val(),
                                        'password' : $('input[name=password]').val()
                                 };

                                var $form = $( this );
				var action = $form.attr( 'action' );

				/* Send the data using post with element id name and name2*/
				var posting = $.get( consts.SERVER+"/user/"+action, formData );

				posting.done(function( data ) {
					
				});
			});
		});

}]);