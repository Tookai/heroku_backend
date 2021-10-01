const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) res.status(403).json("Le token est invalide.");

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Vous n'êtes pas authentifié.");
  }
};
