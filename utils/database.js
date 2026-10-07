require('dotenv').config({url:__dirname + '/../.env'});
var mysql = require('mysql');
const logger = require('../utils/logger');

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

function query(sql, params, callback) {

    const DEBUG = process.env.APP_DEBUG_MODE === 'true'; // Check if debug mode is enabled
   
     const startTime = Date.now(); // Record the start time of the query

    if(typeof params === 'function') {
        callback = params;
        params = [];
    }
      // params is optional: query(sql, callback)
    if (typeof params === 'function') {
        callback = params;
        params = [];
    }

    pool.query(sql, params, (err, results) => {
        if (err) 
            {
                if (DEBUG) {
                    logger.error('Database error: ' + err.message);
                }
                return callback(err, null);
            }
            if (DEBUG) {
            const ensTime = Date.now(); // Record the end time of the query
            const executionTime = ensTime - startTime;
             // Calculate the execution time
             const count= Array.isArray(results) ? results.length : results.affectedRows; // Get the number of records returned
             const txt = Array.isArray(results) ? 'records(s) sent' : 'row(s) affected';
            logger.info(`DB query successful : ${sql} -> (${count} ${txt} (${executionTime} ms)`);
            
        }
        return callback(null,results);
    });
}



module.exports = {query};