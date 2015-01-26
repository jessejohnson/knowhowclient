'use strict';

angular.module('prepgh.main', [])
.config(['$routeProvider', routeProviderFunction])
.controller('mainCtrl', mainCtrlFunction)
.controller('lostCtrl', LostCtrlFunction);

//module functions
function routeProviderFunction($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'app/main/main.html'
	})
	.when('/404', {
		templateUrl: 'app/main/404.html'
	});
}

function mainCtrlFunction($scope){
	console.log('mainCtrl has control');
}

function LostCtrlFunction($scope){
	console.log('lostCtrl has control');
}