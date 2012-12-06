# Node lp

node-lp is an adapter to the unix 'lp(1)' command allowing files to be submitted for printing or altering a pending job. This will only work on Linux at the moment however if anyone wants a windows port then that might happen.

## Installation

Note: you need `cups` installed to use.

Node-lp can then be installed via NPM

    npm install lp

Then, require the module

    var lp = require("lp-client");
    var options = {};

    printer = lp(options);
    printer.queue ("Hello");


## Usage

    lp.queue(fileLocation, [options], listener)

    lp.queue(buffer, [options], listener)

    lp.stop(jobid)

    lp.resume(jobid)

    lp.hold(jobid)


## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)