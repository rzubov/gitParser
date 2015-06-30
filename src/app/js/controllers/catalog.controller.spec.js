(function() {
  'use strict';

  describe('controllers', function(){

    beforeEach(module('gitParser'));

    it('should contain more than 5 repos', inject(function($controller) {
      var vm = $controller('CatalogController');

      expect(angular.isArray(vm.repos)).toBeTruthy();
      expect(vm.repos.length > 5).toBeTruthy();
    }));
  });
})();
