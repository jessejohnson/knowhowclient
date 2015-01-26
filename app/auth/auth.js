'use strict';

angular.module('prepgh.auth', [])
.config(['$routeProvider', routeProviderFunction])
.controller('loginCtrl', loginCtrlFunction)
.controller('signupCtrl', signupCtrlFunction);

function routeProviderFunction($routeProvider){
	$routeProvider
	.when('/login', {
		templateUrl: 'app/auth/login.html'
	})
	.when('/signup', {
		templateUrl: 'app/auth/signup.html'
	});
};

function loginCtrlFunction($scope, authService){
	console.log('loginCtrl has control');
	
	//if user is logged in, redirect to /home
	if(authService.isUserLoggedIn()){
		console.log('user is logged in');
	} else{
		console.log('user is not logged in');
	}

	$scope.login = login;

	function login(){
		authService.login($scope.user.email, $scope.user.password)
		.then(loginSuccess, loginError);
	};

	function loginSuccess(success){
		authService.getUser(localStorage['userEmail']);
	}

	function loginError(error){
		console.log("loginOrSignupError " + error.data);
		$scope.errors = error.data;
	}
}

function signupCtrlFunction($scope, authService){
	console.log('signupCtrl has control');

	$scope.signup = signup;

	function signup(){
		if($scope.user.password1 == $scope.user.password2){
			authService.signup($scope.user.username, $scope.user.email, $scope.user.password1)
			.then(signupSuccess, signupError);
		} else{
			$scope.errors = "Passwords are not identical";
		}
	}

	function signupSuccess(success){
		authService.login($scope.user.email, $scope.user.password1);
	}

	function signupError(error){
		console.log("loginOrSignupError " + error.data);
		$scope.errors = error.data;
	}
}