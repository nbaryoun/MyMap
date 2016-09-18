'use strict';

/**
 * @ngdoc function
 * @name FirstWeb.service:AuthService
 * @description
 * # AuthService
 */
module.exports = [
  '$firebaseAuth',

  function($firebaseAuth) {
    return $firebaseAuth();
  }

];

