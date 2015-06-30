(function() {
  'use strict';

  angular
    .module('gitParser')
    .factory('headerParser', headerParserFactory);

  /** @ngInject */
  function headerParserFactory() {
    return function (linkStr) {
      return linkStr.split(',').map(function(rel) {
        return rel.split(';').map(function(curr, idx) {
          if (idx === 0) return /page=(\d+)/.exec(curr)[1];
          if (idx === 1) return /rel="(.+)"/.exec(curr)[1];
        })
      }).reduce(function(obj, curr, i) {
        obj[curr[1]] = curr[0];
        return obj;
      }, {});
    }
  }
})();
