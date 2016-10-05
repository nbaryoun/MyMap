'use strict';

/**
 * @ngdoc function
 * @name FirstWeb.service:GeoService
 * @description
 * # GeoService
 */
module.exports = [
  '$cordovaGeolocation',
  '$q',

    function ($cordovaGeolocation, $q) {
        // do something
      var posOptions = {timeout: 5000, enableHighAccuracy: false};

      return {
        currentLocation: {
          lat: undefined,
          lng: undefined
        },
        init: function () {
          var self = this;
          self.getCurrentLocation(posOptions);
        },
        getCurrentLocation: function(options){
          var self = this;

          var deferred = $q.defer();

          var success = function (position) {
            self.currentLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(position);
            deferred.resolve();
          };

          var fail =  function (err) {
            // error
            console.log(err);
            deferred.reject(err);
          };

          $cordovaGeolocation.getCurrentPosition(options).then(success,fail);

          return deferred.promise;
        }
      };
    }
];
