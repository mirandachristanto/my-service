const mysqlConfig = require('../config/mysql.json')
const mysql = require('mysql2');

function createPool() {
    try {
        const pool = mysql.createPool({
            host: mysqlConfig.db_host,//process.env.DB_HOST,//,
            user: mysqlConfig.db_user,//process.env.DB_USER,//
            password: mysqlConfig.db_pass,//process.env.DB_PASS,//
            database: mysqlConfig.database,//process.env.DATABASE,//
            connectionLimit: 20,
            waitForConnections: false,
            queueLimit: 0,
            multipleStatements: true
        });
        const promisePool = pool.promise();
        return promisePool;
    } catch (error) {
        console.log(`Could not connect - ${error}`);
        throw new Error(error.toString());
    }
}

const pool = createPool();

module.exports = {
    connectAsync: async function(){
        return true
    },
    queryAsync: async function(sql){
        try{            
            // var connection = await pool.getConnection()
            var [rows, fields] = await pool.query(sql)
            // connection.release()
        }catch(ex){
            console.log(sql)
            console.log(ex.message)
            throw new Error(ex.message);
        }
        return [rows, fields]
    },
    executeAsync: async function(sql, data){
        try{           
            // var connection = await pool.getConnection()
            var[rows, fields] = await pool.query(sql, data)
            // connection.release()
        }catch(ex){
            console.log(sql)
            console.log(ex.message)
            throw new Error(ex.message);
        }
        return [rows, fields]
    },
    endPool: async function(){
        return true
    },
    escape: function(data){
        return mysql.escape(data)
    }
}
