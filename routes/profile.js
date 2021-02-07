const express = require("express");
const router = express.Router();
const connection = require("../config");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
}

router.post("/", verifyToken, (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY_JWT, (err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        name: users.result[0].name,
        lastname: users.result[0].nickname,
      });
    }
  });
});

module.exports = router;
