'use strict';

/**
 * # MainCtrl
 * Controller of the rocketLaunchApp
**/

var rocketApp = angular.module('rocketLaunchControllers', ['Rocket']);

rocketApp.controller('launchCTRL', ['$q', 'rocketService', '$scope', '$moment',	 function($q, rocketService, $scope, $moment) {

	var promise = rocketService.loadData();

	promise.then(function(response)	{

		var data = response.data.launches;

		data.forEach(function(dt)	{

			console.log('Starting Debug');
			console.log('..........');

			var test_date = $moment(dt.gmt_date);
			dt.string_gmt_date = test_date._d.toString();

			// this works the same as the code above
			// dt.string_gmt_date = test_date._d + '';
			// 'co-harsing'


			console.log(test_date);

			// //Debug
			// console.log('days', dt.launch_t.days());
			// console.log(dt.launch_t.hours());
			// console.log(dt.launch_t.minutes());
			// console.log(dt.launch_t.seconds());

			console.log('string version', test_date._d.toString());

			// dt.time = $moment.utc(dt.gmt_date).fromNow();
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
		});

        // set the data return from the promise to the controller
		$scope.launches = data;

	}, function(data) {
		console.log("Something went wrong: ", err);
	});

}]);