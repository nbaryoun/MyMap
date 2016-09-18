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

    function( $scope, currentAuth, AuthService, $state  )
    {
      $scope.user = {};

      $scope.authenticated = currentAuth;

      $scope.login = function () {
        AuthService.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function (firebaseUser) {

          console.log(firebaseUser);
          $state.go('app.map');

        }).catch(function (error) {
          console.error("Authentication failed: ", error);


        })

      };

      $scope.register = function () {
        AuthService.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password).then(function (firebaseUser) {

          console.log(firebaseUser);

        }).catch(function (error) {
          console.error("Authorization failed: ", error);

        })
      };

      $scope.logout = function () {
        AuthService.$signOut();

      }


    }
];
