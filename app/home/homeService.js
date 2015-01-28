'use strict';

angular.module('prepgh.home')
.factory('homeService', homeServiceFunction);

function homeServiceFunction($http, $location, SERVER, REQUEST){
	//public api
	return {
		getTestList: getTestList,
		getResourceList: getResourceList
	}

	//private methods
	function getTestList(){
		//prepare request
		var token = 'Token ' + localStorage['token'];
		REQUEST.url = SERVER + 'api/tests/';
		REQUEST.headers = {
			'Authorization': token
		};
		//send request
		return $http(REQUEST)
			.success(getTestListSuccessFunction)
			.error(getTestListErrorFunction);
	}

	function getResourceList(){
		var token = 'Token ' + localStorage['token'];
		REQUEST.url = SERVER + 'api/resources/';
		REQUEST.headers = {
			'Authorization': token
		};
		//send request
		return $http(REQUEST)
			.success(getResourceListSuccessFunction)
			.error(getResourceListErrorFunction);
	}

	function getTestListSuccessFunction(data, status, headers, config){
		// console.log(data);
		return data;
	}

	function getTestListErrorFunction(data, status, headers, config){
		// return data;
	}

	function getResourceListSuccessFunction(data, status, headers, config){
		return data;
	}

	function getResourceListErrorFunction(data, status, headers, config){
		//do something useful
	}
}