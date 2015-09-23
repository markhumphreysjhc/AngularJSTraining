

(function(){

angular.module('eventModule', [])
.factory('MainTitle', [function () {
	

	return {
		title:"Nougal"
	};
}])
.filter('searchPerson', function() {
  return function(items,search) {
    var filtered = [];
    if(!search){return items;}
    angular.forEach(items, function(item) {

    	value = item.FIRSTNAME.trim() + ' ' + item.SURNAME.trim() +"!"+ item.WHEREABOUTS.trim() 

    	if(angular.lowercase(value).indexOf(angular.lowercase(search))!=-1)
    	{
    		filtered.push(item);
    	}
      
    });
   return filtered;
  };
})

.config([function () {
	console.log("Event Module:: config");
}])
.run([function () {
	console.log("Event Module::running");
}])
.controller('EventCtrl', ['$scope', '$modal', '$http', 'Events', 'MainTitle',function ($scope,$modal,$http,Events,mainTitle) {
	this.title = mainTitle.title;

	this.what = "what"
	
	this.menu=[
		{
			name:"Whereabouts",
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

	this.getData = function(){
		var scope = this;
		$http.get('http://172.19.20.151:8081/api/nougals')
      		.success(function(data){
        scope.people = data;
      });
	}

	this.getData();

	this.modifyPerson = function(person) {
    
		console.log("clicked modifyPerson");

        var modalInstance = $modal.open({
            templateUrl: 'app\\event\\update_modal.html',
            controller: 'modalDialogCtrl',
            resolve: {
                aValue: function() {
                    return person;
                }
            }
        });
  	}
}])
.controller('EventItemCtrl', ['$scope','MainTitle',  function ($scope,mainTitle) {
	
}])
.controller('modalDialogCtrl',function($scope, $modalInstance, $http, aValue) {
    //$scope.person = angular.copy(aValue);
$scope.person = angular.copy(aValue);
    $scope.save = function () {
        $modalInstance.close("save");

        // Now update the values
        console.log('http://172.19.20.151:8081/api/nougals/' + $scope.person.INITIALS);

        console.log($scope.person)

        $http.put('http://172.19.20.151:8081/api/nougals/' + $scope.person.INITIALS, { "initials":$scope.person.INITIALS, "whereabouts":$scope.person.WHEREABOUTS})

        //aValue = angular.copy($scope.person)
    };
    $scope.cancel = function () {
        $modalInstance.close("cancel");
    };

})
.controller('EventTabCtrl', ['$scope', function ($scope) {
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
 .directive('eventItem', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment   
        /*      
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@'         },
            */
        templateUrl: 'app/event/eventItem.html',
       
        controller: function($scope){
            console.log("do stuff")

        }, //Embed a custom controller in the directive
        link: function ($scope, element, attrs) { } //DOM manipulation
    }
});


})();
