(function () {
  'use strict';

  angular.module('gitParser')
    .controller('UserController', UserController);

  function UserController($http, $stateParams, $log, $scope, headerParser, gitToken) {

    $scope.currentPage = 1;
    $scope.repos = [];
    $scope.perPage = 10;
    $scope.showPages = function () {
      return $scope.perPage < $scope.totalItems;
    };


    $http({method: 'GET', url: 'https://api.github.com/users/' + $stateParams.login+'?access_token='+gitToken})
      .success(function (data) {
        $scope.user = data;
        $scope.reposHost = data.repos_url;
        $http({method: 'GET', url: data.repos_url + '?access_token='+gitToken+ '&page=1&per_page=1'})
          .success(function (data, status, headers) {
            if (headers('Link')) {
              $scope.totalItems = headerParser(headers('Link')).last;
            }
            function getData() {
              $http.get($scope.reposHost +'?access_token='+gitToken+ '&page=' + $scope.currentPage + '&per_page=' + $scope.perPage)
                .then(function (response) {
                  angular.copy(response.data, $scope.repos)
                });
            }

            $scope.pageChanged = function () {
              getData();
            };
            getData();
          })
      });







  }
})();
