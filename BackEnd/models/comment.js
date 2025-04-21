const sql = require("../config/db");

exports.create = async (req, res) => {
  const { content, travelId } = req.body;
  const userId = req.user?.userId;

  if (!content || !travelId || !userId) {
    return res.status(400).json({ message: "Content, travelId, and userId are required." });
  }

  try {
    await sql.query`
      INSERT INTO Comments (content, user_id, travel_id, created_at)
      VALUES (${content}, ${userId}, ${travelId}, GETDATE())
    `;
    res.status(201).json({ message: "Comment added successfully." });
  } catch (error) {
    console.error("Error creating comment:", error.message);
    res.status(500).json({ message: "Failed to create comment." });
  }
};

exports.list = async (req, res) => {
  try {
    const result = await sql.query`
      SELECT c.comment_id, c.content, c.created_at, u.user_name
      FROM Comments c
      JOIN UserApp u ON c.user_id = u.user_id
      ORDER BY c.created_at DESC
    `;
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    res.status(500).json({ message: "Failed to fetch comments." });
  }
};
