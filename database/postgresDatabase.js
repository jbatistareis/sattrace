var config = require('./config.json');
var pgPromise = require('pg-promise')();

let db;
function getDb() {
    if (!db) db = pgPromise(process.env.DATABASE_URL || config);
    return db;
}

module.exports = {
    query: (sql, params) => { return getDb().any(sql, params); },
    insert: (sql, params) => { return getDb().one(sql, params); },
    update: (sql, params) => { return getDb().none(sql, params); },
    delete: (sql, params) => { return getDb().none(sql, params); },
    closeConnections: () => { console.log('Closing DB connection'); if (db) db.end(); },
    parseError: (res, error) => {
        res.status(500);
        res.render('error', { message: String.fromCodePoint(0x26A0) + ' Database error', error: error });
    }
};