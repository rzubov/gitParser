(function () {
  'use strict';

  angular
    .module('gitParser')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('catalog', {
        url: '/',
        templateUrl: 'app/templates/pages/catalog.html',
        controller: 'CatalogController',
        controllerAs: 'catalog'
      })
      .state('repo',{
        url:'/repo/:name/:login',
        templateUrl: 'app/templates/pages/repo.html',
        controller:'RepoController',
        controllerAs:'repo'
      })
      .state('user', {
        url: '/user/:login',
        templateUrl: 'app/templates/pages/user.html',
        controller: 'UserController',
        controllerAs: 'user'
      })
      .state('favorites', {
        url: '/favorites',
        templateUrl: 'app/templates/pages/favorites.html',
        controller: 'FavoritesController',
        controllerAs: 'favorite'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
