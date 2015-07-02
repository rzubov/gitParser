(function() {
  'use strict';

  describe('controllers', function(){

    beforeEach(module('gitParser'));

    it('repos should be array', inject(function($rootScope,$controller) {

      var scope = $rootScope.$new();
      var vm = $controller('CatalogController', {$scope: scope });

      expect(angular.isArray(scope.repos)).toBeTruthy();
    }));
  });
})();
