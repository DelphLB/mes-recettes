const express = require("express");
const router = express.Router();
const connection = require("../config");
const jwt = require("jsonwebtoken");

router.post("/", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY_JWT, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
}

module.exports = router;
