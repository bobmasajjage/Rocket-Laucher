
'use strict';

var rocketService = angular.module('Rocket', []);

rocketService.service("rocketService", ['$http', '$q', function ($http, $q) {
	var self = this; 

	var defered = $q.defer();

	$http.get('launchschedule.json').then(function(data) {

		defered.resolve(data);
	});

	self.loadData = function() {

		return defered.promise;
	};
}]);