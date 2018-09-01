var config = require('./config.json');

var pgPromise = require('pg-promise');
var db = pgPromise(process.env.DATABASE_URL || config.url);