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
  '$rootScope',
  '$state',

  function( $ionicPlatform, $rootScope, $state )
  {

  $ionicPlatform.ready(function() {
    // save to use plugins here
  });

  // add possible global event handlers here
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      // We can catch the error thrown when the $requireSignIn promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $state.go("app.map");
      }
    });

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
        controller: 'MenuController',
        resolve: {
          // controller will not be loaded until $waitForSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["AuthService", function(AuthService) {
            // $waitForSignIn returns a promise so the resolve waits for it to complete
            return AuthService.$waitForSignIn();
          }]
        }
      })
      .state('app.login',{
        url: '/login',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/login.html'
          }
        },
        resolve: {
          // controller will not be loaded until $waitForSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["AuthService", function(AuthService) {
            // $waitForSignIn returns a promise so the resolve waits for it to complete
            return AuthService.$waitForSignIn();
          }]
        }
      })
      .state('app.register', {
        url: '/register',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/register.html'
          }
        },
        resolve: {
          // controller will not be loaded until $waitForSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["AuthService", function(AuthService) {
            // $waitForSignIn returns a promise so the resolve waits for it to complete
            return AuthService.$waitForSignIn();
          }]
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
        },
        resolve: {
          // controller will not be loaded until $waitForSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["AuthService", function(AuthService) {
            // $waitForSignIn returns a promise so the resolve waits for it to complete
            return AuthService.$waitForSignIn();
          }]
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
        },
        resolve: {

          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["AuthService", function(AuthService) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return AuthService.$requireSignIn();

          }]
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
        },
        resolve: {

          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["AuthService", function(AuthService) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return AuthService.$requireSignIn();

          }]
        }
      })
      .state('app.myPosts', {
        url: '/myPosts',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/myPosts.html',
            controller: 'PostController'
          }
        },
        resolve: {

          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["AuthService", function(AuthService) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return AuthService.$requireSignIn();

          }]
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
        },
        resolve: {
          // controller will not be loaded until $waitForSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["AuthService", function(AuthService) {
            // $waitForSignIn returns a promise so the resolve waits for it to complete
            return AuthService.$waitForSignIn();
          }]
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
        },
        resolve: {

          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["AuthService", function(AuthService) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return AuthService.$requireSignIn();

          }]
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

//directives
.directive('customMap', require('./directives/Map'))

;
