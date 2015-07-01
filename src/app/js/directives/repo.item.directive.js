(function () {
  'use strict';

  angular
    .module('gitParser')
    .directive('repoItem', repoItem);

  /** @ngInject */
  function repoItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/templates/directives/repo-item.html',
      scope: {
        id: '=',
        name: '=',
        login: '=',
        link: '=',
        avatar: '=',
        description: '=',
        isfavorite: '=',
        cb: '='
      },
      controller: RepoItemController
    };
    return directive;
    /** @ngInject */
    function RepoItemController($scope, $log, ImageToBase64) {


      $scope.addToFavorites = function (repoId, repoName, ownerLogin, repoDesc, ownerAvatar, htmlUrl, isfavorite, cb) {
        var repo = {
          id: repoId,
          name: repoName,
          login: ownerLogin,
          description: repoDesc,
          avatar_url: ownerAvatar,
          html_url: htmlUrl
        };
        var favorite = isfavorite || false;
        var favoriteRepos = angular.fromJson(localStorage.favoriteRepos) || [];

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

        // Use image cache if possible or store image to local storage
        if (!window.storageInfo && !favorite) {
          ImageToBase64(ownerAvatar, function (base64Img) {
            repo.avatar_url = base64Img;
            favoriteRepos.push(repo);
            $log.info('Repository with id ' + repoId + ' added to favorites');
            localStorage.favoriteRepos = angular.toJson(favoriteRepos);
          });
        } else {
          findById(favoriteRepos, repoId);
          localStorage.favoriteRepos = angular.toJson(favoriteRepos);
        }

        if (cb)cb();
        $scope.isfavorite = !$scope.isfavorite;
      }
    }
  }

})();
