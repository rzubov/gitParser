(function () {
  'use strict';

  angular.module('gitParser')
    .controller('UserController', UserController);

  function UserController($http, $stateParams, $log, $scope) {
    $http({method: 'GET', url: 'https://api.github.com/users/' + $stateParams.login})
      .success(function (data) {
        $scope.user = data;
      });
  }
})();
