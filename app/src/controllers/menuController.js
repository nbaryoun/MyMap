'use strict';

/**
 * @ngdoc function
 * @name FirstWeb.controller:MenuController
 * @description
 * # MenuController
 */
module.exports = [
    '$scope',
    'currentAuth',
    'AuthService',
    '$state',
    '$firebaseObject',
    '$ionicHistory',

    function( $scope, currentAuth, AuthService, $state, $firebaseObject, $ionicHistory)
    {

      var ref = firebase.database().ref(); //entire database reference

      $scope.user = {};

      $scope.authenticated = currentAuth;

      $scope.login = function () {
        AuthService.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function (firebaseUser) {

          $scope.authenticated = true;
          var profileRef = ref.child('users').child(firebaseUser.uid).child('profile');
          var profileObject = $firebaseObject(profileRef);

          profileObject.$loaded().then(function () {
            if(profileObject.userName){
              $ionicHistory.nextViewOptions({
                historyRoot: true
              });
              $scope.user = {};
              $state.go('app.map');
            }else{
              $ionicHistory.nextViewOptions({
                historyRoot: true
              });
              $scope.user = {};
              $state.go('app.initialProfile');
            }
          })

        }).catch(function (error) {
          console.error("Authentication failed: ", error);


        })

      };

      $scope.register = function () {
        AuthService.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password).then(function (firebaseUser) {
          $scope.authenticated = true;
          console.log(firebaseUser);
          $ionicHistory.nextViewOptions({
            historyRoot: true
          });
          $scope.user = {};
          $state.go('app.initialProfile');

        }).catch(function (error) {
          console.error("Authorization failed: ", error);

        })
      };

      $scope.logout = function () {
        AuthService.$signOut();
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $scope.authenticated = false;
        $state.go('app.map');
      };



    }

];
