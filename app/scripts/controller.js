'use strict';

/**
 * # MainCtrl
 * Controller of the rocketLaunchApp
**/


var rocketApp = angular.module('rocketLaunchControllers', ['Rocket']);

rocketApp.controller('launchCTRL', ['$q', 'rocketService', function($q, rocketService) {

	var self = this;
	var launches = {};

	rocketService.getData()
	.then(function(data) {

		self.launches = data.items;
		console.log('Response Data: ', data.items)

	},
	function(err) {
		var errMsg = err.error.message;
		console.log("Loading data failed with Error: ", errMsg);
	});


}]);