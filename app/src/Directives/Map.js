'use strict';

/**
 * @ngdoc function
 * @name FirstWeb.Directives:customMap
 * @description
 * # customMap
 */
module.exports = [

    function () {
      return {
        //restrict - tell angular what kind of directive it is
        restrict: 'E',
        //scope - isolating scopes
        scope: {
          //element attributes
          onCreate: '&'
        },

        templateUrl: 'templates/directives/customMap.html',

        link: function ($scope, $element, $attr) {
          var mapCanvas = $element[0].children[0].children[0];
          function initialize() {
            var mapOptions = {
              center: new google.maps.LatLng(43.07493, -89.381388),
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(mapCanvas, mapOptions);

            $scope.onCreate({map: map});


            // Stop the side bar from dragging when mousedown/tapdown on the map
            google.maps.event.addDomListener(mapCanvas, 'mousedown', function (e) {
              e.preventDefault();
              return false;
            });
          }

          if (document.readyState === "complete") {
            initialize();
          } else {
            google.maps.event.addDomListener(window, 'load', initialize);
          }
        }
      }
    }
];
