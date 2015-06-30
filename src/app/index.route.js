(function () {
  'use strict';

  angular
    .module('appName')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('contributors-list',{
        url:'/contributors-list/:name/:login',
        templateUrl: 'app/main/contributorsList.html',
        controller:'ContributorsListController',
        controllerAs:'contributors'
      })
      .state('favorite', {
        url: '/favorite',
        templateUrl: 'app/favorite/favorite.html',
        controller: 'FavoriteController',
        controllerAs: 'favorite'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
