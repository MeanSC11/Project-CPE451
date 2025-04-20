const sql = require("../config/db");

// สร้างประวัติการเดินทางใหม่
exports.createTravelHistory = async (req, res) => {
  const { travelDate, startStation, endStation, travelTime } = req.body;

  try {
    await sql.query`
      INSERT INTO TravelHistory (travel_date, start_station, end_station, travel_time)
      VALUES (${travelDate}, ${startStation}, ${endStation}, ${travelTime})
    `;
    res.status(201).json({ message: "Travel history created successfully." });
  } catch (err) {
    console.error("Error creating travel history:", err);
    res.status(500).json({ error: "Failed to create travel history." });
  }
};

// ดึงประวัติทั้งหมด
exports.getAllTravelHistory = async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM TravelHistory ORDER BY travel_date DESC`;
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching travel history:", err);
    res.status(500).json({ error: "Failed to fetch travel history." });
  }
};

// ดึงประวัติตาม id
exports.getTravelHistoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql.query`SELECT * FROM TravelHistory WHERE travel_id = ${id}`;
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Travel history not found." });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error fetching travel history by ID:", err);
    res.status(500).json({ error: "Failed to fetch travel history." });
  }
};

// ลบประวัติ
exports.deleteTravelHistory = async (req, res) => {
  const { id } = req.params;

  try {
    await sql.query`DELETE FROM TravelHistory WHERE travel_id = ${id}`;
    res.json({ message: "Travel history deleted successfully." });
  } catch (err) {
    console.error("Error deleting travel history:", err);
    res.status(500).json({ error: "Failed to delete travel history." });
  }
};

// อัปเดตประวัติ
exports.updateTravelHistory = async (req, res) => {
  const { id } = req.params;
  const { travelDate, startStation, endStation, travelTime } = req.body;

  try {
    await sql.query`
      UPDATE TravelHistory
      SET travel_date = ${travelDate}, start_station = ${startStation}, end_station = ${endStation}, travel_time = ${travelTime}
      WHERE travel_id = ${id}
    `;
    res.json({ message: "Travel history updated successfully." });
  } catch (err) {
    console.error("Error updating travel history:", err);
    res.status(500).json({ error: "Failed to update travel history." });
  }
};
