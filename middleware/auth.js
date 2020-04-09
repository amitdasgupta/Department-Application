const jwt = require("jsonwebtoken");
const config = require("../default/default.js");

auth = (req, res, next) => {
  const token = req.header("Authorization");
  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorizaton denied" });

  try {
    // Verify token
    const decoded = jwt.verify(JSON.parse(token), config.jwtSecret);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    console.log("error occured", e);
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
