var events = require('events')
  , child_process = require('child_process')
  ;

module.exports.createPrinter = function(device, options) {

  options = options || {};

  var self = new events.EventEmitter()
    ;

  return self;
};