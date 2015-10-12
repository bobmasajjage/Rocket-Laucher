'use strict';

/**
 * @name rocketLaunchApp
 * @description
 * # rocketLaunchApp
 */
var rocket = angular.module('rocketLaunchApp', ['ngRoute', 'rocketLaunchControllers', 'angular-momentjs']);

rocket.config(['$routeProvider','$locationProvider', 
    function($routeProvider, $locationProvider){
        $routeProvider
        .when("/",{
            templateUrl:"../views/main.html",
            controller:"launchCTRL",
            controllerAs:"mainCtrl"
        })
        .otherwise({
            redirectTo:"/"
        })
    }]);

rocket.config(function($momentProvider)	{
	$momentProvider
	.asyncLoading(false)
	.scriptUrl('bower_components/angular-momentjs/angular-momentjs.js');
  });