'use strict';

/**
 * @name rocketLaunchApp
 * @description
 * # rocketLaunchApp
 */
var rocket = angular.module('rocketLaunchApp', ['ngRoute', 'rocketLaunchControllers']);

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

