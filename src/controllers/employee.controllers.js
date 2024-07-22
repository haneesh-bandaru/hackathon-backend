const db = require("../config/config.js");

async function getAllEmployees(req, res) {
  const sql = "SELECT * FROM Employees";
  try {
    const [rows, fields] = await db.query(sql);
    res.send(rows);
  } catch (error) {
    console.error("Error getting all employees:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

async function addEmployee(req, res) {
  const {
    empid,
    empname,
    empmail,
    emprole,
    skill_frontend,
    skill_backend,
    skill_db,
    skill_other,
    availability,
    hierarchial_role,
    assigned_to,
    password,
  } = req.body;
  const sql =
    "INSERT INTO Employees (empid, empname, empmail, emprole, skill_frontend, skill_backend, skill_db, skill_other, availability, hierarchial_role, assigned_to, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    const [rows, fields] = await db.query(sql, [
      empid,
      empname,
      empmail,
      emprole,
      skill_frontend,
      skill_backend,
      skill_db,
      skill_other,
      availability,
      hierarchial_role,
      assigned_to,
      password,
    ]);

    res.status(200).json({
      success: true,
      message: "Employee record inserted",
      data: rows,
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function getEmpCount(req, res) {
  const sqlAssigned = "SELECT count(*) as `Assigned` FROM Employees WHERE assigned_to IS NOT NULL";
  const sqlNotAssigned = "SELECT count(*) as `NotAssigned` FROM Employees WHERE assigned_to IS NULL";

  try {
    const [assignedResult, assignedFields] = await db.query(sqlAssigned);
    const [notAssignedResult, notAssignedFields] = await db.query(sqlNotAssigned);

    const result = {
      Assigned: assignedResult[0].Assigned,
      NotAssigned: notAssignedResult[0].NotAssigned,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting employee count:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { getAllEmployees, addEmployee, getEmpCount };
