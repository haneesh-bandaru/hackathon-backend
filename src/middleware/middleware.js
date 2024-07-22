const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  
  if (!token) {
    return res.status(401).json({ error: "Access denied || Token not found" });
  }

  try {
    const decoded = jwt.verify(token, "2@EH");
    req.role = decoded.role;
    req.username = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
}

module.exports = verifyToken;
