const sql = require("mssql");

// ฟังก์ชันสำหรับค้นหาผู้ใช้จากอีเมล
async function findUserByEmail(email) {
  try {
    const result = await sql.query`SELECT * FROM UserApp WHERE user_email = ${email}`;
    if (result.recordset.length === 0) {
      console.warn(`No user found with email: ${email}`);
      return null; // Return null if no user is found
    }
    return result.recordset[0]; // Return the first user found
  } catch (error) {
    console.error("Database Error in findUserByEmail:", error.message);
    throw new Error("Failed to fetch user from the database");
  }
}

// ฟังก์ชันสำหรับสร้างผู้ใช้ใหม่
async function createUser(name, email, phone, passwordHash) {
  try {
    await sql.query`
      INSERT INTO UserApp (user_name, user_email, user_phone, user_password)
      VALUES (${name}, ${email}, ${phone}, ${passwordHash})
    `;
  } catch (error) {
    console.error("Database Error:", error.message);
    throw new Error("Failed to create user in the database");
  }
}

module.exports = { findUserByEmail, createUser };
