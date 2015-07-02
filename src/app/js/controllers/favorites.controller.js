(function() {
  'use strict';

  angular
    .module('gitParser')
    .controller('FavoritesController', FavoritesController);

  /** @ngInject */
  function FavoritesController($timeout, $http,$log,$scope) {
    $scope.updater = function(){
      $scope.repos = angular.fromJson(localStorage.favoriteRepos)||[];
    };
    $scope.updater()
  }
})();
