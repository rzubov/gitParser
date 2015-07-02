(function() {
  'use strict';

  describe('controllers', function(){

    beforeEach(module('gitParser'));

    it('updater should set scope.repos', inject(function($rootScope,$controller) {
      var scope = $rootScope.$new();
      var fv = $controller('FavoritesController', {$scope: scope });
      scope.updater();
      expect(angular.isArray(scope.repos)).toBeTruthy();
      expect(scope.repos).toBeDefined();
    }));
  });
})();
