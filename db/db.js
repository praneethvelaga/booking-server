const mysql = require('mysql2/promise'); // ✅ use promise-based version
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
  queueLimit: 0
});

// Optional: verify connection on start
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL using promise pool.");
    connection.release();
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
})();

const query = (text, params) => {
  return pool.query(text, params)
    .then(([results]) => results)
    .catch((err) => {
      console.log('Database query failed:', err.message);
      throw err;
    });
};

module.exports = { query };
