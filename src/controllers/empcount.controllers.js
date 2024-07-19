const db = require('../config/config.js');

// getting empcount from the table
exports.getEmpCount = (req, res) => {
  const sql = "SELECT count(*) as assigned_to FROM Employees where assigned_to=1 or assigned_to!=1";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};