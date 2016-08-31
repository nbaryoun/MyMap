/**
 * @ngdoc function
 * @name MyMap.controller:settingCtrl
 * @description
 * # settingCtrl
 */

angular.module('MyMap')
  .controller('settingCtrl', function($scope) {

  })

  .config(function ($stateProvider, $urlRouterProvider) {
    // Application routing
    $stateProvider
      .state('app.settings', {
        url: '/settings',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'src/setting/settings.html',
            controller: 'settingCtrl'
          }
        }
      });
  });
