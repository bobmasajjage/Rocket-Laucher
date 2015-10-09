'use strict';

/**
 * # MainCtrl
 * Controller of the rocketLaunchApp
**/


var rocketApp = angular.module('rocketLaunchControllers', ['Rocket']);

rocketApp.controller('launchCTRL', ['$q', 'rocketService', function($q, rocketService) {

	var self = this;
	self.launches = {};

	rocketService.getLaunches().then(function(data){
		self.launches = data;
		console.log(self.launches);

	}, function(response) {
		console.log('couldnot fetch data error : ', response)

	});

	console.log(self.launches);
}]);