const sql = require("mssql");
require("dotenv").config();

// ตั้งค่าการเชื่อมต่อกับฐานข้อมูล Azure SQL
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // ใช้การเข้ารหัส
    trustServerCertificate: false,
  },
};

// เชื่อมต่อกับฐานข้อมูล
sql.connect(config).then(() => {
  console.log("Connected to Azure SQL Database");
}).catch(err => {
  console.error("Database connection failed:", err);
});

module.exports = sql;
