(function() {
  'use strict';

  angular
    .module('gitParser')
    .config(config);

  /** @ngInject */
  function config($logProvider,ImgCacheProvider) {

    ImgCacheProvider.setOptions({
      debug: true,
      usePersistentCache: true
    });
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
