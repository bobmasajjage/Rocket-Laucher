
'use strict';

var rocketService = angular.module('Rocket', []);

rocketService.factory("rocketService", ['$http', '$q', function ($http, $q) {

	var self = this;

    self.getLaunches = function () {
        var deferred = $q.defer();

        $http.get("/launchschedule.json")
            .then(function (response) {
                deferred.resolve(response.data);
            },
            function (resone) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };
    return self
}]);