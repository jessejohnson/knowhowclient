'use strict';

angular.module('prepgh.auth')
.factory('authService', authServiceFunction);

function authServiceFunction($http, $location, SERVER, REQUEST, POST_REQUEST){
	//public api
	return {
		login: login,
		signup: signup,
		getUser: getUser,
		logout: logout,
		isUserLoggedIn: isUserLoggedIn
	}

	//private methods
	function login(email, password){
		//store email
		localStorage['userEmail'] = email;
		//prepare request
		POST_REQUEST.url = SERVER + 'api-token-auth/';
		POST_REQUEST.data = {
			'username': email,
			'password': password
		};
		//send request
		return $http(POST_REQUEST)
			.success(loginSuccessFunction)
			.error(responseFunction);
	}

	function getUser(email){
		//prepare request
		var token = 'Token ' + localStorage['token'];
		REQUEST.url = SERVER + 'api/getuser/?email=' + email;
		REQUEST.headers = {
			'Authorization': token
		};
		//send request
		return $http(REQUEST)
			.success(getUserSuccessFunction)
			.error(responseFunction);
	}

	function logout(){
		//delete all user variables
		localStorage.removeItem('username');
		localStorage.removeItem('userId');
		localStorage.removeItem('userEmail');
		localStorage.removeItem('userUrl');
		localStorage.removeItem('token');
		//redirect to index
		$location.path('/');
	}

	function signup(username, email, password){
		//temporarily store password in localStorage
		//TODO fix this issue
		// localStorage['pass'] = password;
		//prepare request
		POST_REQUEST.url = SERVER + 'api/signup/';
		POST_REQUEST.data = {
			'username': username,
			'email': email,
			'password': password
		};
		//send request
		return $http(POST_REQUEST)
			.success(signupSuccessFunction)
			.error(responseFunction);
	}

	function isUserLoggedIn(){
		return localStorage['token'] != null;
	}

	function loginSuccessFunction(data, status, headers, config){
		localStorage['token'] = data.token;
	}

	function signupSuccessFunction(data, status, headers, config){
		console.log(data);
	}

	function getUserSuccessFunction(data, status, headers, config){
		//store user
		localStorage['username'] = data.username;
		localStorage['avatar'] = data.avatar;
		localStorage['userId'] = data.id;
		localStorage['userUrl'] = data.url;
		//redirect to home
		$location.path('/home');
	}

	function responseFunction(data, status, headers, config){
		console.log(data);
	}
}