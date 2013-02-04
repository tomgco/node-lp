var Spawn = require('./spawn-lp')
  , mkdirp = require('mkdirp')
  , fs = require('fs')
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
  options.digitalCopyDir  = options.digitalCopyDir || process.env.TMP || process.env.TMPDIR || process.env.TEMP || '/tmp' || process.cwd();
  options.debug = options.debug || false;
  options.args = options.args || [];

  var self = {}
    , spawn = new Spawn(options)
    ;

  // sends the file/buffer to `lp`
  function queue(data) {
    var dir = options.digitalCopyDir + '/node-lp/log/digitalCopy/'
      , filename = Date.now() + '.pdf'
    if (options.digitalCopy) {
      mkdirp(dir, function (err) {
        if (err && options.debug) {
          console.error(err)
        } else {
          fs.writeFile(dir + filename, data, function(err) {
            if (err && options.debug) {
              console.error(err);
            } else if (options.debug) {
              console.log('Saved digital copy "' + filename + '" to: ' + dir);
            }
          })
        }
      });
    }
    if (Buffer.isBuffer(data)) {
      spawn.withData(data);
    } else {
      spawn.withFile(data);
    }
  }

  /**
   *  @deprecated
   */
  function queueFile(file) {
    queue(file);
  }

  self.queue = queue;
  self.queueFile = queueFile;

  return self;
};