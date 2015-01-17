'use strict';

// Declare app level module which which depends on views and components
var app = angular.module('prepgh', [
	'ngRoute',
	'prepgh.modMain',
	'prepgh.modLogin',
	'prepgh.modDashboard'
]);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.otherwise({redirectTo: '/404'});
}]);

app.constant('SERVER', 'http://127.0.0.1:8000/');

app.value('REQ', {
	method: 'GET',
	url: '',
	headers: {}
});

app.value('POSTREQ', {
	method: 'POST',
	url: '',
	headers: {},
	data: {}
});

app.factory('authService', function($rootScope, $http, $location, POSTREQ, REQ, SERVER){
	// service to log user in and other auth related stuff

	//private methods

	// get user token
	var login = function (username, password){

		POSTREQ.url = SERVER + 'api-token-auth/';
		POSTREQ.data = {
			'username': username,
			'password': password
		};
		//send request
		$http(POSTREQ)
			.success(function(data, status, headers, config){
				console.log(data);
				//now store user token in localStorage
				localStorage['token'] = data.token;
				//finally, get the user
				getuser(username);
			})
			.error(function(data, status, headers, config){
				console.log(data);
			});
	};

	// get user based on username
	var getuser = function (username){
		var token = 'Token ' + localStorage['token'];
		REQ.url = SERVER + 'api/getuser/?username=' + username;
		REQ.headers = {
			'Authorization': token
		};
		//send request
		$http(REQ)
			.success(function(data, status, headers, config){
				console.log(data);
				//now store user variables in localStorage
				localStorage['username'] = data.username;
				localStorage['userid'] = data.id;
				localStorage['userurl'] = data.url;
				localStorage['useremail'] = data.email;
				//then redirect to dashboard if user is not signed in already
				redirectIfSignedin();
			})
			.error(function(data, status, headers, config){
				console.log(data);
			});
	};

	//test if the user is signed in already
	var isSignedin = function (){
		return localStorage['userid'] != null;
	};

	//if the user is signed in already, redirect to dashboard
	var redirectIfSignedin = function (){
		if(isSignedin()){
			$location.path('/dashboard');
		} else {
			$location.path('/login');
		}
	};

	//public api
	return {
		login: login,
		getuser: getuser,
		redirect: redirectIfSignedin,
		isSignedin: isSignedin
	};
});