const db = require('../config/config.js');

// Function to get all project details
async function getAllProjects(req, res) {
  const sql = "SELECT * FROM Projects";
  try {
    const [rows, fields] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting all projects:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Function to add project details
async function addProject(req, res) {
  const { projectid, projectname, startdt, enddt, duration, numoftasks, numofemps, projectdesc } = req.body;
  const sql = 'INSERT INTO Projects (projectid, projectname, startdt, enddt, duration, numoftasks, numofemps, projectdesc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  try {
    const [result] = await db.query(sql, [
      projectid,
      projectname,
      startdt,
      enddt,
      duration,
      numoftasks,
      numofemps,
      projectdesc
    ]);

    res.status(200).json({
      success: true,
      message: 'Project record inserted',
      data: result
    });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

module.exports = { getAllProjects, addProject };
