const db = require('../config/config.js');

exports.getAllTasks = (req, res) => {
  const sql = "SELECT * FROM Tasks";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

exports.addTask = (req, res) => {
  const { taskid, projectid, taskname, empid, duration, status } = req.body;
  const sql = 'INSERT INTO Tasks (taskid, projectid, taskname, empid, duration, status) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [taskid, projectid, taskname, empid, duration, status], (err, result) => {
    if (err) throw err;
    res.json({ success: true, message: 'Task record inserted' });
  });
};


