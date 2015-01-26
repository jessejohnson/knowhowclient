var modMain = angular.module('prepgh.modMain', ['ngRoute']);

modMain.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'modMain/main.html'
		})
		.when('/404', {
			templateUrl: 'modMain/404.html'
		});
}]);

modMain.controller('mainCtrl', function($scope){
	console.log('mainCtrl has control');
});

modMain.controller('404Ctrl', function($scope){
	console.log('404Ctrl has control');
});