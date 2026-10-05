require('dotenv').config({url:__dirname + '/../.env'});
var mysql = require('mysql');


var pool = mysql.createPool({
    connectionLimit:        process.env.DB_CONN_LIMIT,
    multipleStatements:     process.env.DB_MULTI_QUERY,
    host:                   process.env.DB_HOST,
    user:                   process.env.DB_USER,
    password:               process.env.DB_PASS,
    database:               process.env.DB_NAME,
    port:                   process.env.DB_PORT,
    timezone:               process.env.DB_TIMEZONE
});

module.exports = pool;