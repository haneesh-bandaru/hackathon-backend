const db = require("../config/config.js");

exports.getAllEmployees = (req, res) => {
  const sql = "SELECT * FROM Employees";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

// inserting into employee table

exports.addEmployee = (req, res) => {
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
  db.query(
    sql,
    [
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
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.json({ success: true, message: "Employee record inserted" });
    }
  );
};

// Getting count of Employee assign to project and count of employees free from the table
exports.getEmpCount = (req, res) => {
  const sqlAssigned =
    "SELECT count(*) as `Assigned` FROM Employees WHERE assigned_to IS NOT NULL";
  const sqlNotAssigned =
    "SELECT count(*) as `NotAssigned` FROM Employees WHERE assigned_to IS NULL";
  db.query(sqlAssigned, (err, assignedResult) => {
    if (err) throw err;
    db.query(sqlNotAssigned, (err, notAssignedResult) => {
      if (err) throw err;
      const result = {
        Assigned: assignedResult[0].Assigned,
        NotAssigned: notAssignedResult[0].NotAssigned,
      };
      res.json(result);
    });
  });
};
