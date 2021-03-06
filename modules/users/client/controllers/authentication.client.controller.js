'use strict';

angular.module('users')
  .controller('controllerAuthentication', controllerAuthentication);
// -----------------------------------------------------------------------------------
//
// CONTROLLER: Authentication
//
// -----------------------------------------------------------------------------------
controllerAuthentication.$inject = ['$scope', '$state', '$http', '$location', '$window', 'Authentication'];
/* @ngInject */
function controllerAuthentication($scope, $state, $http, $location, $window, Authentication) {
  var loginPanel = this;

  loginPanel.authentication = Authentication;

  // Get an eventual error defined in the URL query string:
  loginPanel.error = $location.search().err;

  // If user is signed in then redirect back home
  if (loginPanel.authentication.user) {
    $location.path('/');
  }

  loginPanel.signup = function (isValid) {
    loginPanel.error = null;

    if (!isValid) {
      $scope.$broadcast('show-errors-check-validity', 'userForm');

      return false;
    }

    $http.post('/api/auth/signup', loginPanel.credentials).success(function (response) {
      // If successful we assign the response to the global user model
      loginPanel.authentication.user = response;
      // And redirect to the previous or home page
      $state.go($state.previous.state.name || 'home', $state.previous.params);
    }).error(function (response) {
      loginPanel.error = response.message;
    });
  };

  loginPanel.signin = function (isValid) {
    loginPanel.error = null;
    if (!isValid) {
      $scope.$broadcast('show-errors-check-validity', 'userForm');

      return false;
    }
    $http.post('/api/auth/signin', loginPanel.credentials).success(function (response) {
      // If successful we assign the response to the global user model
      loginPanel.authentication.user = response;
      console.log($state.previous.state.name, response);
      // And redirect to the previous or home page
      //$state.go($state.previous.state.name || 'eao.projects', $state.previous.params);

      $state.go('eao.projects');
    }).error(function (response) {
      loginPanel.error = response.message;
    });
  };

  // OAuth provider request
  // loginPanel.callOauthProvider = function (url) {
  //   if ($state.previous && $state.previous.href) {
  //     url += '?redirect_to=' + encodeURIComponent($state.previous.href);
  //   }

  //   // Effectively call OAuth authentication route:
  //   $window.location.href = url;
  // };
}

