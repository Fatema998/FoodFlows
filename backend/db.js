const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "foodflow",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const query = (...args) => {
  return pool.query(...args);
};

const testConnection = async () => {
  try {
    await pool.query("SELECT 1");

    console.log("MySQL connected successfully");

    return {
      ok: true,
      message: "MySQL connection successful",
    };
  } catch (error) {
    console.error("MySQL connection failed:", error.message);

    return {
      ok: false,
      message: "MySQL connection failed",
      error: error.message,
    };
  }
};

module.exports = {
  pool,
  query,
  testConnection,
};