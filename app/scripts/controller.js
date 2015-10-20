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

			// dt.string_gmt_date = test_date._d + '';
			// 'co-harsing'
			// //Debug


			if (dt.gmt_date === null) {
				dt.invalidDate = true;
			};

			var now = new Date();
			var then = new Date(dt.gmt_date);

			var diffYear = (then.getMonth() - now.getMonth()) + ' ';

			if ( diffYear.charAt(0) === '-') {
				console.log('Before: ', then);
				then.setYear(2016);
				console.log('After": ', then);
			};

			var now_moment =  $moment(now); // initializa a moment object of the time now
			var then_moment =  $moment(then); // intialize a moment object of the launch time

			var duration = $moment.duration(then_moment.diff(now_moment));

            // returns the number of days left to launch
			var getDays = function () { 
				var days = duration.asDays();
				var day_string = days.toString();
				var dot = day_string.indexOf('.');
				var new_day = parseInt(day_string.slice(0, dot));
				console.log(new_day);

				return new_day === 0 || new_day === 1 ? new_day + ' day, ' : new_day+ ' days, ';
			};

			if ( getDays === 'NaN days' || getDays === 'NaN day') {
				dt.invalidDate = true;
			};

			// returns hours left to launch
			var getHours = function () { 

				var hours = duration.hours();
				if ( hours === 1 || hours === 0 ) {
					return hours + ' hour,';
				} else {
					return hours + ' hours,';
				}

			};

			 // returns minutes left to launch
			var getMinutes = function () { 

				var minutes = duration.minutes();
				if ( minutes === 1 || minutes === 0 ) {
					return minutes + ' minute';
				} else {
					return minutes + ' minutes';
				}

			};

			dt.string_gmt_date = then_moment._d.toString();

			if (dt.string_gmt_date === 'Invalid Date') {
				dt.string_gmt_date = false;
			};

			if ( dt.gmt_date === null) {
				dt.invalidDate = true;
			} else {
				dt.launch_days = getDays();
				dt.launch_hours = getHours();
				dt.launch_minutes = getMinutes();
			};

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
