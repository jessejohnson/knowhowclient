'use strict';

angular.module('prepgh.home', [])
.config(['$routeProvider', routeProviderFunction])
.controller('homeCtrl', homeCtrlFunction);

//module functions
function routeProviderFunction($routeProvider){
	$routeProvider
	.when('/home', {
		templateUrl: 'app/home/home.html'
	});
}

function homeCtrlFunction($scope){
	console.log('homeCtrl has control');
	$scope.user = {};
	$scope.user.username = localStorage['username'];
}