'use strict';

/**
 * @ngdoc function
 * @name FirstWeb.controller:MapController
 * @description
 * # MapController
 */
module.exports = [
    '$scope',

    function( $scope )
    {
        $scope.mapCreated= function(map){
          console.log('map was created');
        }
    }
];
