const db = require("../config/config.js");

exports.getAllTasks = (req, res) => {
  const sql = "SELECT * FROM Tasks";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

exports.addTask = (req, res) => {
  const { taskid, projectid, taskname, empid, duration, status } = req.body;
  const sql =
    "INSERT INTO Tasks (taskid, projectid, taskname, empid, duration, status) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [taskid, projectid, taskname, empid, duration, status],
    (err, result) => {
      if (err) throw err;
      res.json({ success: true, message: "Task record inserted" });
    }
  );
};

// Function to get task status
exports.getTasksStatus = (req, res) => {
  const sql = `
    SELECT 
      p.projectid,
      p.projectname as project_name,
      SUM(CASE WHEN t.status = 'Not Started' THEN 1 ELSE 0 END) AS completed_count,
      SUM(CASE WHEN t.status = 'In Progress' THEN 1 ELSE 0 END) AS inprogress_count
    FROM 
      projects p
    LEFT JOIN 
      tasks t ON p.projectid = t.projectid
    GROUP BY 
      p.projectid, p.projectname
  `;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};