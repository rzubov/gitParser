(function () {
  'use strict';

  angular.module('appName')
    .controller('ContributorsListController', ContributorsListController);

  function ContributorsListController($http, $stateParams, $log, $scope, headerParser) {

    var contributors = this;

    $http({method: 'GET', url: 'https://api.github.com/repos/' + $stateParams.login + '/' + $stateParams.name})
      .success(function (data) {
        contributors.project = data;
      });


    $http({
      method: 'GET',
      url: 'https://api.github.com/repos/' + $stateParams.login + '/' + $stateParams.name + '/contributors?page=1&per_page=1'
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
      $http.get('https://api.github.com/repos/' + $stateParams.login + '/' + $stateParams.name + '/contributors?page=' + $scope.currentPage + '&per_page='+$scope.perPage)
        .then(function (response) {
          angular.copy(response.data, $scope.users)
        });
    }
    $scope.pageChanged = function () {
      getData();
    };

  }


})();
