(function() {
  'use strict';

  angular
    .module('gitParser')
    .controller('FavoritesController', FavoritesController);

  /** @ngInject */
  function FavoritesController($timeout, $http,$log) {
    var vm = this;
    vm.repos = angular.fromJson(localStorage.favoriteRepos);

    $log.info(vm.repos);
  }
})();
