'use strict';

angular.module('prepgh', [
	'ngAnimate',
	'ngRoute',
	'angular-loading-bar',
	'prepgh.main',
	'prepgh.auth',
	'prepgh.home',
])
.config(['$routeProvider', routeProviderFunction])
.constant('SERVER', 'http://127.0.0.1:8000/')
.value('REQUEST', {
	method: 'GET',
	url: 'http://127.0.0.1:8000/',
	headers: {}
})
.value('POST_REQUEST', {
	method: 'POST',
	url: 'http://127.0.0.1:8000/',
	headers: {},
	data: {}
});

// module functions
function routeProviderFunction($routeProvider){
	$routeProvider.otherwise({
		redirectTo: '/404'
	});
};