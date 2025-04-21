const sql = require('../config/db'); // Corrected import for mssql

// Fetch travel history for a specific user
const getTravelHistoryByUserId = async (userId) => {
  try {
    console.log('Executing query for userId:', userId); // Debug log
    const query = `
      SELECT 
        th.travel_id,
        th.from_station_id,
        th.to_station_id,
        th.travel_price,
        th.traveled_at,
        s1.station_name AS from_station_name,
        s2.station_name AS to_station_name
      FROM 
        TravelHistory th
      JOIN 
        Stations s1 ON th.from_station_id = s1.station_id
      JOIN 
        Stations s2 ON th.to_station_id = s2.station_id
      WHERE 
        th.user_id = @userId;
    `;

    const request = new sql.Request();
    request.input('userId', sql.Int, userId); // Pass userId as a parameter
    const result = await request.query(query); // Execute the query
    console.log('Query result:', result.recordset); // Debug log
    return result.recordset;
  } catch (error) {
    console.error('Database query error:', error.message);
    throw new Error('Failed to fetch travel history from the database.');
  }
};

module.exports = { getTravelHistoryByUserId };
