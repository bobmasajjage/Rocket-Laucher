'use strict';

/**
 * # MainCtrl
 * Controller of the rocketLaunchApp
**/

var rocketApp = angular.module('rocketLaunchControllers', ['Rocket']);

rocketApp.controller('launchCTRL', ['$q', 'rocketService', '$scope', function($q, rocketService, $scope) {

	var promise = rocketService.loadData();

	promise.then(function(response)	{
		$scope.launches = response.data.launches;
		console.log($scope.launches);

	}, function(data) {
		console.log("Something went wrong: ", err);
	});


}]);