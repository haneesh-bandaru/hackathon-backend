const db = require('../config/config.js');

exports.getEmpNotCount = (req, res) => {
  const sql = "SELECT  count(*) as not_assigned_to FROM Employees where assigned_to=1 or assigned_to!=1";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};