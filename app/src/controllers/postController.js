'use strict';
/**
 * @ngdoc function
 * @name FirstWeb.controller:PostController
 * @description
 * # PostController
 */
module.exports = [
  '$scope',
  '$firebaseArray',
  '$state',
  'currentAuth',
  'GeoService',
  '$ionicLoading',

  function ($scope, $firebaseArray, $state, currentAuth, GeoService, $ionicLoading) {

    var ref = firebase.database().ref();
    var postRef = ref.child('posts').orderByChild('userid').equalTo(currentAuth.uid);
    var postsArray = $firebaseArray(postRef);

    postsArray.$loaded().then(function () {
      console.log('posts: ', postsArray);
      $scope.myPosts = postsArray;
    });
    $scope.newPost = {
      picture: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiRq-rqttbPAhVnz1QKHYtJAmoQjRwIBQ&url=https%3A%2F%2Fplacehold.it%2F&psig=AFQjCNGPFwhgLpUmBuc3Ucu5PdRpeRnWug&ust=1476401638329373',
      title: '',
      comment: '',
      location: {
        lat: '',
        lng: ''
      },
      userid: currentAuth.uid
    };


    $scope.savePost = function () {
      $ionicLoading.show();
      GeoService.getCurrentLocation().then(function () {
        $scope.newPost.location = GeoService.currentLocation;
        postsArray.$add($scope.newPost).then(function(ref) {
            console.log(ref);
            $ionicLoading.hide();
            $state.go('app.map');
          },
          function(error) {
            console.log("Error: ", error);
            $ionicLoading.hide();
          });
      }, function (error) {
        console.log("Error: ", error);
        $ionicLoading.hide();
      });

    };
    $scope.choiceSheet =function () {
      //show the action sheet
    }
  }
];
