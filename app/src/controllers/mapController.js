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
    '$firebaseArray',
    '$ionicLoading',

    function( $scope, GeoService, $firebaseArray, $ionicLoading )
    {
      var ref = firebase.database().ref();
      var postRef = ref.child('posts');
      var postsArray = $firebaseArray(postRef);

      postsArray.$loaded().then(function () {
        console.log('posts: ', postsArray);
        $scope.posts = postsArray;
      });

        $scope.mapCreated= function(map){
          console.log('map was created');
          $scope.map = map;
          postsArray.$loaded().then(function () {
            $scope.loadMarkers();
          });
        };

        $scope.loadMarkers = function () {
          $scope.markers = [];
          $scope.posts.forEach(function (post) {
            var marker = new google.maps.Marker({
              position: post.location,
              map: $scope.map,
              icon: post.picture
            });
            $scope.markers.push(marker);
          });
          console.log($scope.markers);
        };

        $scope.centerMap = function (){
          $ionicLoading.show();
          console.log($scope.map);
          GeoService.getCurrentLocation().then(function () {
            $scope.map.setCenter(GeoService.currentLocation);
            $ionicLoading.hide();
          });
        }

    }


];
