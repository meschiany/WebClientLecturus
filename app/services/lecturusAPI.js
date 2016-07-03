/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
myApp.service("$rest", function($http, $user){
    
   return {
        
       open:function(module, action){
           
           try{
               var token = $user.getToken();
            }catch(err){
                
                //navigate to login page
                window.location = "#login";
            }
           return new APIAction($http, module, action, token);
       }
   } 
});

function APIAction($http, module, action, token){
    
    
    var module=module;
    var action=action;
    var filters = {};
    var attrs = {};
    
    this.setFilters = function(_filters){
        
        filters = _filters;
        return this;
    }
    
    this.setAttrs = function(_attrs){
        
        attrs = _attrs;
        return this;
    }
    
    this.get = function(success, failure){
        
        $http.get("http://52.23.174.169:3000/"+module+"/"+action+"?"+this.getAttsString()+this.getFiltersString()+"&debug=true")
                .then(success,failure);
        return this;
    }
    
    this.postFile = function(formData, callback){
        
        $.post("http://52.23.174.169:3000/"+module+"/"+action+"?"+this.getAttsString()+this.getFiltersString()+"&debug=true", formData, callback);
    }
    
    this.getAttsString = function(){
        var s = "";
        for(i in attrs) s += i+"="+attrs[i]+"&";
        return s;
    }
    
    this.getFiltersString = function(){
        var s = "";
        for(i in filters) s += "filters["+i+"]="+filters[i]+"&";
        return s;
    } 
}

