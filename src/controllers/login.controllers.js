const db = require("../config/config.js");
//

// Login
exports.getLogin = (req, res) => {
  //   console.log(req.body);
  const { username, password } = req.body;
  console.log(req.body);
  const sql = `select * from login_details where username = '${username}' and password = '${password}'`;
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
};


