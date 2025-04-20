const sql = require("../config/db");

// Add multiple stations
exports.addStations = async (req, res) => {
    const stations = req.body;

    if (!Array.isArray(stations) || stations.length === 0) {
        return res.status(400).json({ message: "Please provide an array of stations." });
    }

    try {
        for (const station of stations) {
            await sql.query`
                INSERT INTO Stations (station_id, station_name, station_english_name, station_line, station_position, station_fare, latitude, longitude)
                VALUES (${station.id}, ${station.name}, ${station.english}, ${station.line}, ${station.position}, ${station.fare}, ${station.lat}, ${station.lon})
            `;
        }
        res.status(201).json({ message: `${stations.length} stations added.` });
    } catch (error) {
        console.error("Error creating stations:", error);
        res.status(500).json({ message: "Failed to create stations." });
    }
};

// Get all stations
exports.getStations = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Stations ORDER BY station_position ASC`;
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Error fetching stations:", error);
        res.status(500).json({ message: "Failed to fetch stations." });
    }
};

