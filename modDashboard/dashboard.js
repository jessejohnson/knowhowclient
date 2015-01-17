var modDashboard = angular.module('prepgh.modDashboard', ['ngRoute']);

modDashboard.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/dashboard', {
			templateUrl: 'modDashboard/dashboard.html'
		});
}]);

modDashboard.controller('dashboardCtrl', function($scope, authService){
	console.log('dashboardCtrl has control');

	authService.redirect();

	//define user
	$scope.user = {};
	//set user variables
	$scope.user.username = localStorage['username'];
	$scope.user.userid = localStorage['userid'];
});