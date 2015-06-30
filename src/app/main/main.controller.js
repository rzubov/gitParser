(function () {
  'use strict';

  angular.module('appName')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $scope, $http, $log ) {
    var vm = this;

    $scope.repos = [];
    $scope.since = 0;

    getData();
    function getData(page) {
      if (page) $scope.since = 0;
      $http({method: 'GET', url: 'https://api.github.com/repositories?since=' + $scope.since})
        .success(function (data, status, headers) {
          $scope.since = /since=(\d+)/.exec(headers('Link'))[1];
          $log.info(headers('Link'));
          angular.copy(data, $scope.repos)
        });
    }
    $scope.nextPage = function () {
      getData();
    };
    $scope.firstPage = function () {
      getData(true);
    };
    $scope.addToFavorites = function($event,repoId,repoName,ownerLogin,repoDesc,ownerAvatar){
        var repo={
          id:repoId,
          name:repoName,
          login:ownerLogin,
          description:repoDesc,
          avatar_url:ownerAvatar
        };

      function findById(source, id) {
        for (var i = 0; i < source.length; i++) {
          if (source[i].id === id) {
            $log.info('Repository with id '+id+' already in favorites');
            favoriteRepos.splice(i, 1);
            return false;
          }
        }
        favoriteRepos.push(repo);
        return true;
      }


      var favoriteRepos = angular.fromJson(localStorage.favoriteRepos);
      if(!favoriteRepos) {
        favoriteRepos=[];
      }

      findById(favoriteRepos,repoId);
      localStorage.favoriteRepos = angular.toJson(favoriteRepos);
      

    }
  }
})();
