var Printer = require('../lp')
  , lp = new Printer()
  ;

lp.queue('Hello');

lp.queueFile('./out.pdf');