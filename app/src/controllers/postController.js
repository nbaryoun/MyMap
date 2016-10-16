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
  '$cordovaCamera',
  '$ionicPopup',

  function ($scope, $firebaseArray, $state, currentAuth, GeoService, $ionicLoading, $cordovaCamera, $ionicPopup) {

    var ref = firebase.database().ref();
    var postRef = ref.child('posts').orderByChild('userid').equalTo(currentAuth.uid);
    var postsArray = $firebaseArray(postRef);

    postsArray.$loaded().then(function () {
      console.log('posts: ', postsArray);
      $scope.myPosts = postsArray;
    });
    $scope.newPost = {
      picture: null,
      title: '',
      comment: '',
      location: {
        lat: '',
        lng: ''
      },
      userid: currentAuth.uid
    };


    $scope.savePost = function () {
      if (!$scope.newPost.picture) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'There is no picture!'
        });

        alertPopup.then(function(res) {
          console.log('Thank you.');
        });
        return;
      }
      else if ($scope.newPost.comment === '' || $scope.newPost.title === '') {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'Please add a title or comment.'
        });

        alertPopup.then(function(res) {
          console.log('Thank you.');

        });
        return;
      }
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
    $scope.choiceSheet = function () {
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.newPost.picture =  imageData;
      }, function(err) {
        // error
      });

    }
  }
];
