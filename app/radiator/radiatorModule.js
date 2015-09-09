
(function(){

angular.module('radiatorModule', [])
.factory('MainTitle', [function () {
	

	return {
		title:"Radiator"
	};
}])
.filter('searchPerson', function() {
  return function(items,search) {
    var filtered = [];
    if(!search){return items;}
    angular.forEach(items, function(item) {

    	if(angular.lowercase(item.FIRSTNAME).indexOf(angular.lowercase(search))!=-1)
    	{
    		filtered.push(item);
    	}
      
    });
   return filtered;
  };
})

.controller('RadiatorCtrl', ['$scope', '$modal', '$http','MainTitle',function ($scope,$modal,$http,mainTitle) {
	this.title = mainTitle.title;

	this.what = "what"
	
	//this.people = [{"INITIALS":"SFA  ","SURNAME":"ADAM                ","LASTTIME":0,"USERPROFILE":"SHAHEENA  ","EXTENSION":"LD","FIRSTNAME":"SHAHEEN                       ","EMAIL":"shaheen.adam@jhc.co.uk                                                ","FULLNAME":"Shaheen Adam        ","WHEREABOUTS":"Somewhere or other                                                                   "}]

	this.menu=[
		{
			name:"Radiator",
			href:"index.html"
		},
		{
			name:"Contact",
			href:"contact.html"
		}
	]	

	this.index = 0;
	this.eventIndex = 0;

	this.setIndex=function(val)
	{
		this.index = val;
		console.log("called")
	}

	this.getIndex=function(){
		return(this.index);
	}

	this.setEventIndex = function(val)
	{
		this.eventIndex = val;
	}

	this.getEventIndex = function(){
		return(this.eventIndex);
	}

	var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	this.encode = function(input){
		var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
  
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
  
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
  
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
  
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
  
            return output;
	}

	this.getData = function(){
		var scope = this;

		//Authentication.SetCredentials('MHDEV', 'MHDEV');
			var username = 'humphreysm'
			var password = 'charlotte1'

			var authdata = this.encode(username + ':' + password);

			console.log("Auth = " + username + ':' + password);

			console.log("Auth = " + authdata);
  
//            $rootScope.globals = {
  //              currentUser: {
    //                username: username,
      //              authdata: authdata
        //        }
          //  };
  
            $http.defaults.headers.common['authorization'] = 'Basic ' + authdata; // jshint ignore:line
//            $http.defaults.headers.common['access-control-allow-origin'] = "*";
///            $http.defaults.headers.common['access-control-allow-methods'] = "GET, POST, PUT, DELETE, OPTIONS";            
  //          $http.defaults.headers.common['access-control-allow-headers'] = "Authorization";
//
            //$cookieStore.put('globals', $rootScope.globals);
        $http.defaults.useXDomain = true;
        delete $http.defaults.headers.common['X-Requested-With'];

//        $http.defaults.headers.common['Access-Control-Request-Headers'] = '*';
//        $http.defaults.headers.common['Access-Control-Request-Origin'] = '*';
//        $http.defaults.headers.common['Access-Control-Request-Methods'] = 'GET,POST,PUT,HEAD,DELETE,OPTIONS';         

		$http.get('http://jenkins.jhcllp.local/view/transaction-testing-radiator-view/api/xml')
      		.success(function(data){
        	scope.people = data;
      	});
	}
/*
	this.getData = function(){

		console.log("called this.getData")

		var scope = this;
		Events.get(function(data){
      		this.people = data;

			console.log(this.people.length)      		
      	});

	}
*/
	this.getData();
	//console.log(this.people.length)    

/*
	this.people=[
	{
		firstName : "Mark",
		lastName : "Humphreys",
		userName: "MARKH",
		whereAbouts: "Birmingham"
	},
	{
		firstName : "John",
		lastName : "Cullen",
		userName: "JOHNC",
		whereAbouts: "Newcastle"
	},
	{
		firstName : "Alex",
		lastName : "Francis",
		userName: "ALEXF",
		whereAbouts: "London"
	},
	]
	*/


	this.addPerson = function(userId) {
    
		console.log("clicked add");
/*
		var elem = {
		firstName : "Christoph",
		lastName : "Kieselmann",
		userName: "CKIESELMAN",
		whereAbouts: "Tamworth"
		}

    	this.people.push(elem);
*/

        var modalInstance = $modal.open({
            templateUrl: 'add_user_modal',
            controller: $scope.model,
            resolve: {
                id: function() {
                    return userId;
                }
            }
        });

	    // close modal
        $modalInstance.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        // Add new user
        $modalInstance.add = function() {
   //         Users.$add($scope.user)
            $modalInstance.dismiss('cancel');
        };

        // Save edited user.
        $modalInstance.save = function() {
     //       $scope.user.$save();
            $modalInstance.dismiss('cancel');
        };
  	}

	
}])

.controller('RadiatorItemCtrl', ['$scope','MainTitle',  function ($scope,mainTitle) {
	
}])
.controller('RadiatorTabCtrl', ['$scope', function ($scope) {
	this.tab = 0;
	this.setTab=function(val)
	{
		this.tab = val;
	}
	this.getTab=function(val)
	{
		return(this.tab);
	}
	
}])

// directives
 .directive('summaryItem', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment   
        /*      
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@'         },
            */
        templateUrl: 'app/radiator/summaryItem.html',
       
        controller: function($scope){
            console.log("do stuff")

        }, //Embed a custom controller in the directive
        link: function ($scope, element, attrs) { } //DOM manipulation
    }
})

 .directive('radiatorItem', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment   
        /*      
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@'         },
            */
        templateUrl: 'app/radiator/radiatorItem.html',
       
        controller: function($scope){
            console.log("do stuff")

        }, //Embed a custom controller in the directive
        link: function ($scope, element, attrs) { } //DOM manipulation
    }
});


})();