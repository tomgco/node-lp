var Spawn = require('./spawn-lp')
  ;

module.exports.createPrinter = function(options) {

  /** options are:
   * `destination` -  Prints files to the named printer.
   * `hostname` - Chooses an alternate server.
   * `port` - Chooses an alternate server port (only use if hostname is specified).
   * `username` - Specifies the username to use when connecting to the server.
   * `encryption` - bool, default false
   * `digitalCopy` - Allows logging of what excatly is being printed.
   * `debug` - bool, default false
   */
  options = options || {};

  // maybe use underscore?
  // or a new module for this
  options.destination = options.destination || false;
  options.hostname = options.hostname || false;
  options.port = options.port || false;
  options.username = options.username || false;
  options.encryption = options.encryption || false;
  options.digitalCopy  = options.digitalCopy || false;
  options.debug = options.debug || false;
  options.args = options.args || [];

  var self = {}
    , spawn = new Spawn(options.args)
    ;

  // sends the file/buffer to `lp`
  function queue(data) {
    spawn.withData(data);
  }

  function queueFile(file) {
    spawn.withFile(file);
  }

  self.queue = queue;
  self.queueFile = queueFile;

  return self;
};