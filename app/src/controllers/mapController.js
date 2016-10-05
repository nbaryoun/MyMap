'use strict';

/**
 * @ngdoc function
 * @name FirstWeb.controller:MapController
 * @description
 * # MapController
 */
module.exports = [
    '$scope',
    'GeoService',
    function( $scope, GeoService )
    {
        $scope.mapCreated= function(map){
          console.log('map was created');
          $scope.map = map;
          $scope.loadMarkers();
        };

        $scope.loadMarkers = function () {

        };

        $scope.centerMap = function (){
          console.log($scope.map);
          GeoService.getCurrentLocation().then(function () {
            $scope.map.setCenter(GeoService.currentLocation);
          });
        }

    }


];
