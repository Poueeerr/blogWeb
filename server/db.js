const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',         
    database: 'userposts',    
    password: 'postgres'       
});

module.exports = pool;