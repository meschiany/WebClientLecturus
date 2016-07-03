/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
myApp.service("$user", function(){
    
    return {
        
        getToken:function(){
            
            // get token from local storage
            var token = window.localStorage.getItem("vitToken");
            if(token == undefined || token == ""){
                   throw 'No user sesssion';
            }  
            
            return token;
        }
        
    };
});

