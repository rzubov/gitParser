(function () {
  'use strict';

  angular.module('gitParser')
    .controller('RepoController', RepoController);

  function RepoController($http, $stateParams, $log, $scope, headerParser, gitToken) {

    var contributors = this;

    $http({method: 'GET', url: 'https://api.github.com/repos/' + $stateParams.login + '/' + $stateParams.name+'?access_token='+gitToken})
      .success(function (data) {
        contributors.project = data;
      });


    $http({
      method: 'GET',
      url: 'https://api.github.com/repos/' + $stateParams.login + '/' + $stateParams.name + '/contributors?access_token='+gitToken+'&page=1&per_page=1'
    }).success(function (data, status, headers) {
      if(headers('Link')){
        $scope.totalItems = headerParser(headers('Link')).last;
      }

    });

    $scope.currentPage = 1;
    $scope.users = [];
    $scope.perPage = 30;
    $scope.showPages = function(){
        return $scope.perPage< $scope.totalItems;
    };


    getData();


    function getData() {
      $http.get('https://api.github.com/repos/' + $stateParams.login + '/' + $stateParams.name + '/contributors?access_token='+gitToken+'&page=' + $scope.currentPage + '&per_page='+$scope.perPage)
        .then(function (response) {
          angular.copy(response.data, $scope.users)
        });
    }
    $scope.pageChanged = function () {
      getData();
    };

  }


})();
