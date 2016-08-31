/**
 * @ngdoc function
 * @name MyMap.controller:mainCtrl
 * @description
 * # mainCtrl
 */

angular.module('MyMap')
  .controller('mainCtrl', function($scope) {

  })

  .config(function ($stateProvider, $urlRouterProvider) {
    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'src/main/main.html',
        controller: 'mainCtrl'
      })
  });
