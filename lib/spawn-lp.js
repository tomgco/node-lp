var events = require('events')
  , childProcess = require('child_process')
  ;

var createSpawner = module.exports = function(lpArguments) {

  var self = new events.EventEmitter()
    , lp
    ;

  lpArguments = lpArguments || [];

  function listen(lp) {
    lp.stdout.on('data', function(data) {
      // debug
      console.log(data.toString());
    });

    lp.stderr.on('data', function(data) {
      // err
      console.log('Error: ' + data.toString());
    });

    lp.on('exit', function(code) {
      if(code === 0) {
        self.emit('end');
      } else {
        self.emit('error', new Error('lp has closed unexpectedly.'));
      }
    });
  }

  self.withData = function(data) {
    lp = childProcess.spawn('lp'
      , lpArguments
      );
    listen(lp);
    lp.stdin.write(data);
    lp.stdin.end();
  };

  self.withFile = function(file) {
    lpArguments.push('--'); // used to allow filenames starting with a dash (-)
    lpArguments.push(file);
    lp = childProcess.spawn('lp'
      , lpArguments
      );
    listen(lp);
  };

  return self;
};