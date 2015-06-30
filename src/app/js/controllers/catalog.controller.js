(function () {
  'use strict';

  angular.module('gitParser')
    .controller('CatalogController', CatalogController);

  /** @ngInject */
  function CatalogController($timeout, $scope, $http, $log) {
    var vm = this;

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
          $log.info('Repository with id ' + repo[i].id + ' inited as favorite');
        }
      }
    }


    $scope.addToFavorites = function ($event, repoId, repoName, ownerLogin, repoDesc, ownerAvatar) {
      function findByObj(source, id) {
        for (var i = 0; i < source.length; i++) {
          if (source[i].id === id) {
            return i;
          }
        }
        favoriteRepos.push(repo);
        return true;
      }

      var id = findByObj($scope.repos, repoId);
      $scope.repos[id].favorite = !$scope.repos[id].favorite;
      var repo = {
        id: repoId,
        name: repoName,
        login: ownerLogin,
        description: repoDesc,
        avatar_url: ownerAvatar
      };

      function findById(source, id) {
        for (var i = 0; i < source.length; i++) {
          if (source[i].id === id) {
            $log.info('Repository with id ' + id + ' removed from favorites');
            favoriteRepos.splice(i, 1);
            return false;
          }
        }
        favoriteRepos.push(repo);
        $log.info('Repository with id ' + id + ' added to favorites');
        return true;
      }


      var favoriteRepos = angular.fromJson(localStorage.favoriteRepos);
      if (!favoriteRepos) {
        favoriteRepos = [];
      }

      findById(favoriteRepos, repoId);
      localStorage.favoriteRepos = angular.toJson(favoriteRepos);
    }
  }
})();
