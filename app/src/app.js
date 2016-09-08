'use strict';

/**
 * @ngdoc overview
 * @name FirstWeb
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */

// Example to require lodash
// This is resolved and bundled by browserify
//
// var _ = require( 'lodash' );

angular.module( 'FirstWeb', [
  'ionic',
  'ngCordova',
  'ngResource',
  'firebase'
] )
.run( [
  '$ionicPlatform',

  function( $ionicPlatform )
  {

  $ionicPlatform.ready(function() {
    // save to use plugins here
  });

  // add possible global event handlers here

} ] )

.config( [
  '$httpProvider',
  '$stateProvider',
  '$urlRouterProvider',



  function( $httpProvider, $stateProvider, $urlRouterProvider )
  {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');
    // Initialize the Firebase SDK
    var config = {
      apiKey: "AIzaSyAru90O9rOy0pzLpmjI-xPlTOcZTke8BY4",
      authDomain: "firstweb-4878c.firebaseapp.com",
      databaseURL: "https://firstweb-4878c.firebaseio.com",
      storageBucket: "firstweb-4878c.appspot.com"
    };
    firebase.initializeApp(config);


    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MenuController'
      })
      .state('app.login',{
        url: '/login',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/login.html'
          }
        }
      })
      .state('app.register', {
        url: '/register',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/register.html'
          }
        }
      })
      .state('app.map', {
        url: '/map',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/map.html',
            controller: 'MapController'
          }
        }
      })
      .state('app.initialProfile', {
        url: '/initialProfile',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/initialProfile.html',
            controller: 'ProfileController'
          }
        }
      })
      .state('app.myProfile', {
        url: '/myProfile',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/myProfile.html',
            controller: 'ProfileController'
          }
        }
      })
      .state('app.myPosts', {
        url: '/myPosts',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/myProfile.html',
            controller: 'PostController'
          }
        }
      })
      .state('app.detailedPost', {
        url: '/detailedPost',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/detailedPost.html',
            controller: 'MapController'
          }
        }
      })
      .state('app.createPost', {
        url: '/createPost',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/createPost.html',
            controller: 'PostController'
          }
        }
      });


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/app/map');
  }
] )

// Angular module controllers
//
.controller( 'MenuController',    require( './controllers/menuController'    ) )
.controller( 'MapController',     require( './controllers/mapController'     ) )
.controller( 'ProfileController', require( './controllers/profileController' ) )
.controller( 'PostController',    require( './controllers/postController'    ) )


// Angular module services
//
.factory( 'AuthService',        require( './services/AuthService' ) )
.factory( 'ApiService',            require( './services/ApiService'     ) )
;
