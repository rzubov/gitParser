(function() {
  'use strict';

  angular
    .module('gitParser')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
