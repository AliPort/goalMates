const Pool = require('pg').Pool;


const pool = new Pool({
    user: 'postgres',
    password: 'kurwa',
    host: 'localhost',
    port: 5432,
    database: 'goalMates'
});

module.exports = pool;