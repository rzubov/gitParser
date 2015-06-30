(function () {
  'use strict';

  angular.module('gitParser')
    .controller('CatalogController', CatalogController);

  /** @ngInject */
  function CatalogController($timeout, $scope, $http, $log) {
    $scope.repos = [];
    $scope.since = 0;
    $scope.repos.favorite = false;


    getData();

    function getData(page) {
      if (page) $scope.since = 0;
      $http({method: 'GET', url: 'https://api.github.com/repositories?since=' + $scope.since})
        .success(function (data, status, headers) {
          $scope.since = /since=(\d+)/.exec(headers('Link'))[1];
          angular.copy(data, $scope.repos);
          var ids = [];
          var favoriteRepos = angular.fromJson(localStorage.favoriteRepos);
          if (favoriteRepos) {
            for (var i = 0; i < favoriteRepos.length; i++) {
              ids.push(favoriteRepos[i].id);
            }
            setFavorites($scope.repos, ids);
          }
        });
    }
    $scope.nextPage = function () {
      getData();
    };
    $scope.firstPage = function () {
      getData(true);
    };
    function setFavorites(repo, favorites) {
      for (var i = 0; i < repo.length; i++) {
        if (favorites.indexOf(repo[i].id) !== -1) {
          repo[i].favorite = true;
          $log.info('Repository with id ' + repo[i].id + ' initialized as favorite');
        }
      }
    }
  }
})();
