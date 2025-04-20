const sql = require("../config/db");

exports.addTravelHistory = async (req, res) => {
    const { fromStationId, toStationId } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(400).json({ message: "Please log in before proceeding." });
    }

    try {
        const fromStation = await sql.query`SELECT * FROM Stations WHERE station_id = ${fromStationId}`;
        const toStation = await sql.query`SELECT * FROM Stations WHERE station_id = ${toStationId}`;

        if (fromStation.recordset.length === 0 || toStation.recordset.length === 0) {
            return res.status(404).json({ message: "Invalid station IDs." });
        }

        const stationDiff = Math.abs(fromStation.recordset[0].station_position - toStation.recordset[0].station_position);
        const price = 15 * stationDiff;

        await sql.query`
            INSERT INTO TravelHistory (user_id, from_station_id, to_station_id, travel_price, traveled_at)
            VALUES (${userId}, ${fromStationId}, ${toStationId}, ${price}, GETDATE())
        `;

        res.status(201).json({ message: "Travel history added successfully." });
    } catch (error) {
        console.error("Error creating travel history:", error);
        res.status(500).json({ message: "Failed to save travel history." });
    }
};

exports.getLatestTravelHistory = async (req, res) => {
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(400).json({ message: "Please log in to view travel history." });
    }

    try {
        const result = await sql.query`
            SELECT TOP 1 * FROM TravelHistory
            WHERE user_id = ${userId}
            ORDER BY traveled_at DESC
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "No travel history found." });
        }

        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error("Error fetching travel history:", error);
        res.status(500).json({ message: "Failed to fetch travel history." });
    }
};

exports.getTravelHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await sql.query`
            SELECT * FROM TravelHistory
            WHERE user_id = ${userId}
            ORDER BY traveled_at DESC
        `;
        res.json(result.recordset);
    } catch (error) {
        console.error("Error getting travel history:", error);
        res.status(500).json({ message: "Failed to get travel history." });
    }
};


