(function() {
  'use strict';

  angular
    .module('gitParser')
    .controller('FavoritesController', FavoritesController);

  /** @ngInject */
  function FavoritesController($timeout, $http,$log,$scope) {
    var favorites = this;
    favorites.updater = function(){
      $scope.repos = angular.fromJson(localStorage.favoriteRepos);
    };
    favorites.updater()

  }
})();
