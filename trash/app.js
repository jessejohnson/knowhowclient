'use strict';

// Declare app level module which which depends on views and components
var app = angular.module('prepgh', [
	'ngRoute',
	// 'ngAnimate',
	'angular-loading-bar',
	'prepgh.modMain',
	'prepgh.modAuth',
	'prepgh.modAuthService',
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

app.factory('testService', function($rootScope, $http, $location, POSTREQ, REQ, SERVER){

	//method to get a list of tests
	var gettests = function(){
		var token = 'Token ' + localStorage['token'];
		REQ.url = SERVER + 'api/tests/';
		REQ.headers = {
			'Authorization': token
		};
		//send request
		return $http(REQ)
			.success(function(data, status, headers, config){
				//do something good
				// console.log(data);
			})
			.error(function(data, status, headers, config){
				//tell us what happened
			});
	};

	var taketest = function(testId){
		var token = 'Token ' + localStorage['token'];
		REQ.url = SERVER + 'api/taketest/?test_id=' + testId;
		REQ.headers = {
			'Authorization': token
		};
		//send request
		return $http(REQ)
			.success(function(data, status, headers, config){
				//do something
			})
			.error(function(data, status, headers, config){
				//tell us what happened
			});
	};

	var gototest = function(testId){
		localStorage['current_test'] = testId;
		$location.path('/desk');
	}

	//public api
	return {
		gettests: gettests,
		taketest: taketest,
		gototest: gototest
	};
});