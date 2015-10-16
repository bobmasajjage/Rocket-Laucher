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

			// this works the same as the code above
			// dt.string_gmt_date = test_date._d + '';
			// 'co-harsing'
			// //Debug

			console.log('starting........');

			var now = new Date();
			var then = new Date(dt.gmt_date);

			var diffYear = (then.getMonth() - now.getMonth()) + ' ';

			if ( diffYear.charAt(0) === '-') {
				console.log('Before: ', then);
				then.setYear(2016);
				console.log('After": ', then);
			};

			var now_moment =  $moment(now);
			var then_moment =  $moment(then);

			// var launch_date = $moment(dt.gmt_date);
			dt.string_gmt_date = then_moment._d.toString();

			if (dt.string_gmt_date === 'Invalid Date') {
				dt.string_gmt_date = false;
			};


			$scope.launcher_date = then_moment;

			if ( then_moment.fromNow() === "Invalid date") {
				dt.from_now = false;
			} else {
				dt.from_now = then_moment.fromNow();
			};
			
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




var now = new Date();
var then = new Date('2015-03-10 00:00:00+00:00');

var diffYear = (then.getMonth() - now.getMonth()) + ' ';

if ( diffYear.charAt(0) === '-') {
	then.setYear(2016)
	console.log(then);
}

console.log(diffYear);