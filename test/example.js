var Printer = require('../lp')
  , lp = new Printer()
  ;

lp.queue('Hello');

lp.queueFile(__dirname + '/out.pdf');