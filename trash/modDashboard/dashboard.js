var modDashboard = angular.module('prepgh.modDashboard', ['ngRoute']);

modDashboard.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/dashboard', {
		templateUrl: 'modDashboard/dashboard.html'
	})
	.when('/desk', {
		templateUrl: 'modDashboard/testdesk.html'
	});
}]);

modDashboard.controller('dashboardCtrl', function($scope, authService, testService){
	console.log('dashboardCtrl has control');

	//redirect if user is not logged in
	authService.redirect();

	//define user
	$scope.user = {};
	//set user variables
	$scope.user.username = localStorage['username'];
	$scope.user.userid = localStorage['userid'];
	$scope.user.isSignedIn = authService.isSignedIn();

	console.log($scope.user.isSignedIn);

	//now get a list of available tests for the user to take
	testService.gettests()
	.then(function(success){
		$scope.data = success.data.results;
		console.log(success);
	},
	function(error){
		$scope.data = error;
	});

	$scope.takeTest = function(testId){
		console.log(testId);
		testService.gototest(testId);
	}

	//create logout function
	$scope.logout = function(){
		authService.logout();
	};
});

modDashboard.controller('testDeskCtrl', function($scope, authService, testService){
	console.log('testDeskCtrl has control');

	//redirect if user is not logged in
	authService.redirect();

	testService.taketest(localStorage['current_test'])
		.then(function(success){
			$scope.data = success.data.results;
			$scope.testName = success.data.results[0].test.exam.short_name + 
				" " + success.data.results[0].test.name;
		},
		function(error){
			$scope.data = error.data;
		});

	//create logout function
	$scope.logout = function(){
		authService.logout();
	};

});