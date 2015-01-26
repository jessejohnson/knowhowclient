var modAuth = angular.module('prepgh.modAuthService', ['ngRoute', 'angular-loading-bar']);

modAuth.factory('authService', function($rootScope, $http, $location, POSTREQ, REQ, SERVER){
	// service to log user in and other auth related stuff

	//private methods

	// get user token
	var login = function (email, password){

		POSTREQ.url = SERVER + 'api-token-auth/';
		POSTREQ.data = {
			'username': email,
			'password': password
		};
		//send request
		return $http(POSTREQ)
			.success(function(data, status, headers, config){
				console.log(data);
				//now store user token in localStorage
				localStorage['token'] = data.token;
				//finally, get the user
				getuser(email);
			})
			.error(function(data, status, headers, config){
				// console.log(data);
			});
	};

	var signup = function (username, email, password){

		POSTREQ.url = SERVER + 'api/signup/';
		POSTREQ.data = {
			'username': username,
			'email': email,
			'password': password
		};
		//send request
		return $http(POSTREQ)
			.success(function(data, status, headers, config){
				console.log(data);
				//now log the user in
				login(email, password);
			})
			.error(function(data, status, headers, config){
				console.log(data);
			});
	};

	var logout = function (){
		//delete all user variables
		localStorage.removeItem('username');
		localStorage.removeItem('userid');
		localStorage.removeItem('useremail');
		localStorage.removeItem('userurl');
		localStorage.removeItem('token');

		//now redirect to index
		$location.path('/');
	}

	// get user based on email
	var getuser = function (email){
		var token = 'Token ' + localStorage['token'];
		REQ.url = SERVER + 'api/getuser/?email=' + email;
		REQ.headers = {
			'Authorization': token
		};
		//send request
		return $http(REQ)
			.success(function(data, status, headers, config){
				console.log(data);
				//now store user variables in localStorage
				localStorage['username'] = data.username;
				localStorage['userid'] = data.id;
				localStorage['userurl'] = data.url;
				localStorage['useremail'] = data.email;
				//then redirect to dashboard if user is not signed in already
				// redirectIfSignedin();
				$location.path('/dashboard');
			})
			.error(function(data, status, headers, config){
				console.log(data);
			});
	};

	//test if the user is signed in already
	var isSignedIn = function (){
		return localStorage['userid'] != null;
	};

	//if the user is signed in already, redirect to dashboard
	var redirectIfSignedin = function (){
		if(isSignedIn()){
			// $location.path('/dashboard');
		} else {
			$location.path('/login');
		}
	};

	//public api
	return {
		login: login,
		signup: signup,
		logout: logout,
		getuser: getuser,
		redirect: redirectIfSignedin,
		isSignedIn: isSignedIn
	};
});