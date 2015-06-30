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
        isfavorite: '='
      },
      controller: RepoItemController
    };
    return directive;
    /** @ngInject */
    function RepoItemController($scope, $log) {
      $scope.addToFavorites = function (repoId, repoName, ownerLogin, repoDesc, ownerAvatar, htmlUrl) {
        var repo = {
          id: repoId,
          name: repoName,
          login: ownerLogin,
          description: repoDesc,
          html_url: htmlUrl
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
        if (!favoriteRepos) favoriteRepos = [];

        function convertImgToBase64(url, callback, outputFormat) {
          var img = new Image();
          img.crossOrigin = 'Anonymous';
          img.onload = function () {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            var dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback(dataURL);
            canvas = null;
          };
          img.src = url;
        }
        convertImgToBase64(ownerAvatar, function(base64Img){
          repo.avatar_url = base64Img;
          findById(favoriteRepos, repoId);
          localStorage.favoriteRepos = angular.toJson(favoriteRepos);
        });

        $scope.isfavorite = !$scope.isfavorite;
      }
    }
  }

})();
