(function() {
  'use strict';

  angular
    .module('appName')
    .controller('FavoriteController', FavoriteController);

  /** @ngInject */
  function FavoriteController($timeout, $http,$log) {
    var vm = this;
    vm.repos =angular.fromJson(localStorage.favoriteRepos);

    $log.info(vm.repos);
  }
})();
