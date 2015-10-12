'use strict';

/**
 * # MainCtrl
 * Controller of the rocketLaunchApp
**/

var rocketApp = angular.module('rocketLaunchControllers', ['Rocket']);

rocketApp.controller('launchCTRL', ['$q', 'rocketService', '$scope', function($q, rocketService, $scope) {

	var promise = rocketService.loadData();

	promise.then(function(response)	{

		var data = response.data.launches;

		data.forEach(function(dt)	{
			dt.gmt_date = new Date(dt.gmt_date);
			var link = dt.launch_site;
			dt.wiki_link = '';
			link  = link.split(',');

			if( link.length === 3) {
				link = link[1];
			} else {
				link = link[0];
			};

			var wikiLink = link.split(' ');
			link = wikiLink.join('_')

			if ( link.startsWith('_') ) {
				link = link.slice(1, link.length);
				console.log(link);

			};
		});

        // set the data return from the promise to the controller
		$scope.launches = data;
	}, function(data) {
		console.log("Something went wrong: ", err);
	});

}]);