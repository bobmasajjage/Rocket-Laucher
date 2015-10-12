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

         // create a new property on the rocketLaunch object 
			dt.wiki_link = '';

			link  = link.split(',');

			if( link.length === 3) {
				link = link[1];
			} else {
				link = link[0];
			};

			var wikiLink = link.split(' ');
			link = wikiLink.join('_')

			// we dont need links that starts with ( _ ) so take _ off that starts with it
			if ( link.startsWith('_') ) {
				link = link.slice(1, link.length);
			};

			// assign the new link now to the launch object wiki_link
			dt.wiki_link = link;
			console.log(dt.wiki_link);
		});

        // set the data return from the promise to the controller
		$scope.launches = data;

	}, function(data) {
		console.log("Something went wrong: ", err);
	});

}]);