
'use strict'

var rocketService = angular.module('Rocket', []);

rocketService.factory('rocketService', [ '$http', '$q',  function($http, $q) {

	var self = this;
	var data = {};

	var self.getData = function() {
		$http.get('launchschedule.json')
		.then(function(response) {
			if (typeof response.data === 'object') {
				self.data = response.data;
			} else {
				$q.reject(response.data);
			},
			function(response) {
				console.log("Loading Json failed with Error: ", response)
				$q.reject(response.data);
			}
		});
	};
	
	return self;

}])
