// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config/config");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const countSql = `SELECT COUNT(*) as count FROM employees WHERE empmail = ? AND password = ?`;
    const [countRows] = await connection.query(countSql, [username, password]);

    if (countRows[0].count != 1) {
      res.status(500).send("User Not found");
      return false;
    }

    const roleSql = `SELECT emprole FROM employees WHERE empmail = ? AND password = ?`;
    const [roleRows] = await connection.query(roleSql, [username, password]);

    console.log(roleRows);
    const role = roleRows[0].emprole;

    // Token generation
    const token = jwt.sign(
      { userId: username, role: roleRows[0].role_name },
      "2@EH",
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
