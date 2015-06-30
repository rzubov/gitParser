(function() {
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
        name:'=',
        login:'=',
        repoUrl:'=',
        avatar:'=',
        description:'=',
        favorites:'='

      }
    };

    return directive;

    /** @ngInject */
    function RepoItemController($scope) {
      var vm = this;

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
