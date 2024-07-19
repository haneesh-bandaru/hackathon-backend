// const db = require('../config/config.js');

// exports.login1 = (req, res) => {
//   const { username, upassword } = req.body;
//   const sql = 'SELECT * FROM login_details WHERE username = ? AND upassword = ?';
//   db.query(sql, [username, upassword], (err, result) => {
//     if (err) throw err;
//     if (result.length < 0) {
//       res.json({ success: true });
//     } else {
//       res.status(500).json({ success: false });
//     }
//   });
// };
