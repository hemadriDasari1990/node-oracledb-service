global.rootdir = __dirname; //ROOT level directory
global.config = require('config');

// Import required modules
let express = require('express');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let winston = require('winston');
let routes = require(rootdir + '/routes/jp.js');
let app = express();

//necessary for REST API
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(methodOverride('X-HTTP-Nethod-Override'));


//add CORS support
app.use(function (req, res, next) {
    logger.debug(" Adding the CORS support inside the initializing funtion ");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



//Trigger manual GC every 3 hours - Apps running under PM2 issue
var runGC = function () {
    console.log("Enter - run GC  -- time -->" + new Date().toString());
    if (global.gc) {
        global.gc();
        console.log('After gc ');
    } else {
        console.log('Garbage collection unavailable.  use --expose-gc '
            + 'when launching node to enable forced garbage collection.');
    }
    console.log("Exit  - run GC  -- time -->" + new Date().toString());
}

var router = app.use('/jp', routes);

function start() {
    app.listen(config.app.port, function () {
        console.log("Database initialized and application started at port - " + config.app.port);
    })
}

//Make JSON pretty
app.set('json spaces', 2);

//start pool and then begin listening
//OracleDB.initializePool().then(start).catch(process.exit)
module.exports = app;