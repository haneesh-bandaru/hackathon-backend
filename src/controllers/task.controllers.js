const db = require("../config/config.js");

async function getAllTasks(req, res) {
  const sql = "SELECT * FROM Tasks";
  try {
    const [rows, fields] = await db.query(sql);
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

async function addTask(req, res) {
  const { taskid, projectid, taskname, empid, duration, status } = req.body;
  const sql =
    "INSERT INTO Tasks (taskid, projectid, taskname, empid, duration, status) VALUES (?, ?, ?, ?, ?, ?)";

  try {
    const [rows, fields] = await db.query(sql, [
      taskid,
      projectid,
      taskname,
      empid,
      duration,
      status,
    ]);

    res.status(200).json({
      success: true,
      message: "Task added successfully",
      data: rows,
    });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Function to get task status
async function getTasksStatus(req, res) {
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
  try {
    const [rows, fields] = await db.query(sql);
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getTasksStatus, getAllTasks, addTask };
