'use strict';

/**
 * @ngdoc function
 * @name FirstWeb.controller:ProfileController
 * @description
 * # ProfileController
 */
module.exports = [
    '$scope',
    '$state',
    'currentAuth',
    '$firebaseObject',

    function( $scope, $state, currentAuth, $firebaseObject )
    {
      var ref = firebase.database().ref(); //entire database reference
      var profileRef = ref.child('users').child(currentAuth.uid).child('profile');
      var profileObject = $firebaseObject(profileRef);


      $scope.profile = {};

      $scope.action = 'Create';


      profileObject.$loaded().then(function () {
        console.log('profileObject: ', profileObject);
        $scope.profile = profileObject;
      });

      $scope.saveProfile = function () {

        profileObject = $scope.profile;

          profileObject.$save().then(function(ref) {
            console.log(ref);
            if  ($scope.action === 'Edit') {
              $state.go('app.myProfile');
            }
            else {
              $state.go('app.map');
            }
          },
            function(error) {
          console.log("Error: ", error);
          });


      }


    }
]
