/*Angular Modules take a name, best practice is lowerCamelCase, and a list of dependancies*/
/*added the second module as a dependancy */

angular.module('Authentication', []);

angular.module('radiatorApp', ['radiatorModule','ngRoute','ui.router','ui.bootstrap'])
.config(['$urlRouterProvider','$stateProvider','$httpProvider',
  function($urlRouterProvider,$stateProvider) {

    $stateProvider
        .state("home", {

          // Use a url of "/" to set a states as the "index".
          url: "/home",
          templateUrl: 'radiator-home.html'

        })
        
        .state("contact", {

          // Use a url of "/" to set a states as the "index".
          url: "/contact",
          templateUrl: 'contact.html'

        })

        $urlRouterProvider.when('', '/home');
  
  }])
.run([function () {
	/* Run is when the app gets kicked off*/
	console.log("Run hook");
}])
.factory('Events', ['$http', function($http){
    return{
      get: function(callback){

          $http.get('http://jenkins.jhcllp.local/view/transaction-testing-radiator-view/api/xml').success(function(data) {
            callback(data);
        });
      }
    };
    }]);