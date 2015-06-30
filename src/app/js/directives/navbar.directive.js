(function() {
  'use strict';

  angular
    .module('gitParser')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/templates/directives/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment,$scope,$location) {
      var vm = this;
      $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
      };

      $scope.classActive = function( viewLocation ) {
        if( $scope.isActive(viewLocation) ) {
          return 'active-btn';
        }
        else {
          return 'inactive-btn';
        }
      };
      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
