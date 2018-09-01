var config = require('./config.json');
var pgPromise = require('pg-promise');

let db;
function getDb() {
    if (!db) db = pgPromise(process.env.DATABASE_URL || config.url);
    return db;
}

module.exports = {
    query: (sql, params) => { return getDb().any(sql, params); },
    insert: (sql, params) => { return getDb().one(sql, params); },
    update: (sql, params) => { return getDb().none(sql, params); },
    delete: (sql, params) => { return getDb().none(sql, params); },
    closeConnections: () => { if (db) db.end(); }
};