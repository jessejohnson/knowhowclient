'use strict';

angular.module('prepgh.auth', [])
.config(['$routeProvider', routeProviderFunction])
.controller('loginCtrl', loginCtrlFunction)
.controller('signupCtrl', signupCtrlFunction)
.controller('navbarCtrl', navbarCtrlFunction);

function routeProviderFunction($routeProvider){
	$routeProvider
	.when('/login', {
		templateUrl: 'app/auth/login.html'
	})
	.when('/signup', {
		templateUrl: 'app/auth/signup.html'
	});
};

function loginCtrlFunction(authService){
	console.log('loginCtrl has control');
	authService.redirectIfLoggedIn("/login", "/home");

	var vm = this;
	vm.login = login;

	function login(){
		authService.login(vm.user.email, vm.user.password)
		.then(loginSuccess, loginError);
	};

	function loginSuccess(success){
		authService.getUser(localStorage['userEmail']);
	}

	function loginError(error){
		console.log("loginOrSignupError " + error.data);
		vm.errors = error.data;
	}
}

function signupCtrlFunction(authService){
	console.log('signupCtrl has control');
	authService.redirectIfLoggedIn("/signup", "/home");

	var vm = this;

	vm.signup = signup;

	function signup(){
		if(vm.user.password1 == vm.user.password2){
			authService.signup(vm.user.username, vm.user.email, vm.user.password1)
			.then(signupSuccess, signupError);
		} else{
			vm.errors = "Passwords are not identical";
		}
	}

	function signupSuccess(success){
		authService.login(vm.user.email, vm.user.password1)
		.then(loginSuccess, loginError);
	}

	function signupError(error){
		console.log("loginOrSignupError " + error.data);
		vm.errors = error.data;
	}

	function loginSuccess(success){
		authService.getUser(localStorage['userEmail']);
	}

	function loginError(error){
		console.log("loginOrSignupError " + error.data);
		vm.errors = error.data;
	}
}

function navbarCtrlFunction(authService){
	var vm = this;

	vm.user = {};
	vm.logout = logout;

	vm.user.username = localStorage['username']
	vm.user.userUrl = localStorage['userUrl'];
	vm.user.userId = localStorage['userId'];

	function logout(){
		authService.logout();
	}
}