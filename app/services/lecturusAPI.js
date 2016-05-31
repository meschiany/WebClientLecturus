/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
myApp.service("$rest", function($http){
    
   return {
        
       open:function(module, action){
           return new APIAction($http, module, action);
       }
   } 
});

function APIAction($http, module, action){
    
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
        
        $http.get("http://lecturus2.herokuapp.com/"+module+"/"+action+"?"+this.getAttsString()+this.getFiltersString())
                .then(success,failure);
        return this;
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

