const sql = require("../config/db");

exports.getETA = async (req, res) => {
    try {
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({ message: "Please specify 'from' and 'to' stations in the query string." });
        }

        const result = await sql.query`
            SELECT * FROM TrainSchedules WHERE from_station = ${from} AND to_station = ${to}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "No trains available for this route." });
        }

        res.json(result.recordset);
    } catch (error) {
        console.error("getETA error:", error.message);
        res.status(500).json({ message: "Internal server error." });
    }
};

