'use strict';

angular.module('prepgh.resource', [])
config(['$routeProvider', routeProviderFunction])
.controller('resourceCtrl', resourceCtrlFunction);

//module functions
function routeProviderFunction($routeProvider){
	$routeProvider
	.when('/resource', {
		templateUrl: 'app/resource/resource.html'
	});
}

function resourceCtrlFunction(){
	var vm  this;
	console.log('resourceCtrl has control');
}