//declare app module
var myapp = angular.module('myapp', ['ngRoute']);

myapp.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'login.html'
	})
	.when('/profile', {
		templateUrl: 'profile.html'
	})
	.when('/tests', {
		templateUrl: 'tests.html'
	})
	.otherwise({redirectTo: '/'});
}]);

myapp.controller('loginControler', function($scope, $http, $location){

	// user model for login
	$scope.user = {
		'username': '',
		'password': ''
	}

	$scope.login = function(){
		//login stuff
		console.log("user login complete");
		console.log($scope.user);

		$http.post("http://127.0.0.1:5000/api-token-auth/", $scope.user)
		.success(function(data, status, headers, config){
			console.log(data);
			localStorage["token"] = data.token;

				// redirect to /profile
				$location.path('/profile');
			})
		.error(function(data, status, headers, config){
			console.log(data);
		});
	};
});

myapp.controller('takeTestController', function($scope, $http){

	var tokenString = 'Token ' + localStorage['token'];

	var req = {
		method: 'GET',
		url: 'http://127.0.0.1:5000/api/taketest/?test_id=2',
		headers: {
			'Authorization': tokenString
		}
	}

	$http(req)
	.success(function(data, status, headers, config){
		console.log(data.results);
		$scope.testdata = data.results;
	})
	.error(function(data, status, headers, config){
		console.log(data);
	});
});

myapp.controller('profileController', function($scope, $http){

	$scope.user = {
		'username': "",
		'email': ""
	}
	//first, get user information from server
	$http.get("http://127.0.0.1:5000/api/users/1/")
	.success(function(data, status, headers, config){
		console.log(data);
		$scope.user.username = data.username;
		$scope.user.email = data.email;
	})
	.error(function(data, status, headers, config){
		console.log(data);
	});
});