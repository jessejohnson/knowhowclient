var modAuth = angular.module('prepgh.modAuth', ['ngRoute', 'angular-loading-bar']);

modAuth.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/login', {
			templateUrl: 'modAuth/login.html'
		})
		.when('/signup', {
			templateUrl: 'modAuth/signup.html'
		});
}]);

modAuth.controller('loginCtrl', function($scope, authService){
	console.log('loginCtrl has control');

	authService.redirect();

	$scope.user = {
		'email': '',
		'password': ''
	};


	$scope.login = function(){
		//log the user in...
		authService.login($scope.user.email, $scope.user.password)
		.then(
			function(success){
				$scope.data = success;
			},
			function(error){
				$scope.errors = error.data.non_field_errors;
				console.log(error.data);
			});
	};
});

modAuth.controller('signupCtrl', function($scope, authService){
	console.log('signupCtrl has control');

	authService.redirect();

	$scope.user = {
		'username': '',
		'email': '',
		'password': ''
	};

	$scope.signup = function(){
		//sign up a new user
		authService.signup($scope.user.username, $scope.user.email, $scope.user.password)
		.then(
			function(success){
				$scope.data = success;
			},
			function(error){
				console.log(error.data);
				$scope.errors = error.data;
			});
	}
});