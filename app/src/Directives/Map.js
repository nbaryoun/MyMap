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
        link: function ($scope, $element, $attr) {
          function initialize() {
            var mapOptions = {
              center: new google.maps.LatLng(43.07493, -89.381388),
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map($element[0], mapOptions);

            $scope.onCreate({map: map});


            // Stop the side bar from dragging when mousedown/tapdown on the map
            google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
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
