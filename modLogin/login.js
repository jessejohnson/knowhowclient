var modLogin = angular.module('prepgh.modLogin', ['ngRoute']);

modLogin.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/login', {
			templateUrl: 'modLogin/login.html'
		})
		.when('/signup', {
			templateUrl: 'modLogin/signup.html'
		});
}]);

modLogin.controller('loginCtrl', function($scope, authService){
	console.log('loginCtrl has control');

	authService.redirect();

	$scope.user = {
		'username': '',
		'password': ''
	};


	$scope.login = function(){
		//log the user in...
		authService.login($scope.user.username, $scope.user.password);
	};
});

modLogin.controller('signupCtrl', function($scope){
	console.log('signupCtrl has control');
});