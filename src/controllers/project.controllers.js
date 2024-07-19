const db = require('../config/config.js');

// getting all the projects details
exports.getAllProjects = (req, res) => {
  const sql = "SELECT * FROM Projects";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

// inserting project details
exports.addProject = (req, res) => {
  const { projectid, projectname, startdt, enddt, duration, numoftasks, numofemps,projectdesc} = req.body;
  const sql = 'INSERT INTO Projects (projectid, projectname, startdt, enddt, duration, numoftasks, numofemps, projectdesc) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
  db.query(sql, [projectid, projectname, startdt, enddt, duration, numoftasks, numofemps, projectdesc], (err, result) => {
    if (err) throw err;
    res.json({ success: true, message: 'Project record inserted' });
  });
};



