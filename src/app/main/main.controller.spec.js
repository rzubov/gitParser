(function() {
  'use strict';

  describe('controllers', function(){

    beforeEach(module('appName'));

    it('should contain more than 5 repos', inject(function($controller) {
      var vm = $controller('MainController');

      expect(angular.isArray(vm.repos)).toBeTruthy();
      expect(vm.repos.length > 5).toBeTruthy();
    }));
  });
})();
