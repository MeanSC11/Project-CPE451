const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5000;
const IP = '0.0.0.0'; // Ensure the server binds to all network interfaces

const app = express();
app.use(cors());
app.use(express.json());  // ใช้สำหรับรับข้อมูลแบบ JSON

// ตั้งค่าเส้นทางสำหรับ API Authentication
app.use("/api/auth", authRoutes);

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, IP, () => {
    console.log(`Server running on http://${IP}:${PORT}`);
});
