require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

module.exports = {
  authenticateToken,
};