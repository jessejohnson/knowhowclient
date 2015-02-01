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

function homeCtrlFunction(authService, homeService){

	var vm = this;
	vm.tests = [];
	vm.resources = [];
	vm.takeTest = takeTest;
	vm.viewResource = viewResource;
	

	console.log('homeCtrl has control');
	authService.redirectIfLoggedIn("/login", "/home");
	//load tests
	homeService.getTestList()
	.then(getTestListSuccess, getTestListError)

	//load resources
	homeService.getResourceList()
	.then(getResourceListSuccess, getResourceListError);

	function takeTest(){
		console.log("take test...");
	}

	function viewResource(){
		console.log("view resource...");
	}

	function getTestListSuccess(success){
		vm.tests = success.data.results;
	}

	function getTestListError(error){
		// this.errors = error.data;
	}

	function getResourceListSuccess(success){
		vm.resources = success.data.results;
	}

	function getResourceListError(error){
		//this.errors = error.data...
	}
}