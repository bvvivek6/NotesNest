const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expecting format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  // authenticateToken.js
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = {
      ...user,
      _id: user.id || user._id, // normalize for convenience
    };

    next();
  });
}

module.exports = {
  authenticateToken,
};
