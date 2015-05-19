/** Package Server
 *
 *  @copyright  Copyright (C) 2015 by Yieme
 *  @module     pakr
 */
 (function() {
  'use strict';
  var PakrError = require('make-error')('PakrError')

  /** Pakr
   *  @class
   *  @param      {object} options - The options
   *  @return     {object}
   */
  function pakrClass(options) {
    /*jshint validthis: true */
    var self = this
    options = options || {}
    self.value = options
    return self
  }



  /** Pakr
   *  @constructor
   *  @param      {object} options - The options
   *  @return     {object}
   */
  function pakr(options) {
    return new pakrClass(options).value
  }


  module.exports = pakr
})();
