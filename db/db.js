const mysql =  require('mysql2');
require('dotenv').config();

//create a connection pool to MYSQL
const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10, 
    queueLimit: 0
});
pool.getConnection((err,connection)=>{
    if(err){
        console.log('Database connection failed:', err.message)
    }else{
        console.log('Connection to MySQL database established.');
        connection.release();
    }
})
const query = (text, params)=>{
    return new Promise((resolve, reject)=>{
        pool.query(text, params,(err,results)=>{
            if(err){
                console.log('Database query failed:',err.message);
                return reject(err);
            }
            resolve(results);
        })
    })
}

module.exports = {query}