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

			var now = new Date();
			var then =  new Date(dt.gmt_date);

			var m_now = $moment(now);
			var m_then = $moment(then);


			var diff = $moment(m_then).unix() - $moment(m_now).unix();

			dt.launch_t = $moment.unix(diff);

			//Debug
			// console.log('days', time.days());
			// console.log(time.hours());
			// console.log(time.minutes());
			// console.log(time.seconds());

			dt.gmt_date = then;

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