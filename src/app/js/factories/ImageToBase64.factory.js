(function() {
  'use strict';

  angular
    .module('gitParser')
    .factory('ImageToBase64', ImageToBase64Factory);

  /** @ngInject */
  function ImageToBase64Factory() {
    return function(url, callback, outputFormat) {
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback(dataURL);
        canvas = null;
      };
      img.src = url;
    }
  }
})();
/**
 * Created by rz on 01.07.2015.
 */
