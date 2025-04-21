const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const PORT = process.env.PORT || 5000;
const IP = '0.0.0.0'; // Ensure the server binds to all network interfaces

const app = express();
app.use(cors({
  origin: '*', // Allow all origins for testing; restrict in production
}));
app.use(express.json()); // ใช้สำหรับรับข้อมูลแบบ JSON

const authRoutes = require("./routes/auth");
const travelRoutes = require("./routes/travelRoutes");
const stationRoutes = require("./routes/stationRoutes");
const trainRoutes = require("./routes/trainRoutes");
const slipRoutes = require('./routes/slipRoutes'); // Import slipRoutes
const recordRoutes = require('./routes/recordRoutes'); // Ensure this import exists
const commentRoutes = require('./routes/commentRoutes');

// ตั้งค่าเส้นทางสำหรับ API Authentication
app.use("/api/auth", authRoutes);
app.use("/api/travel", travelRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/bts", trainRoutes);
app.use('/api/slip', slipRoutes); // สำหรับอัปโหลดสลิป
app.use('/api/record', recordRoutes);
app.use('/api/comment', commentRoutes);

// เพิ่ม middleware เพื่อตรวจสอบว่าเซิร์ฟเวอร์ทำงานอยู่
app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, IP, () => {
  console.log(`Server running on http://${IP}:${PORT}`);
});
