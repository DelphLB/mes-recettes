const express = require("express");
const router = express.Router();
const connection = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// créer un user
router.post("/", (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const dataUser = {
    email: req.body.email,
    password: hash,
    name: req.body.name,
  };

  connection.query("INSERT INTO user SET ?", [dataUser], (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

router.post("/login", (req, res) => {
  connection.query(
    "SELECT * FROM user WHERE email = ?",
    [req.body.email],
    (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        if (results.length > 0) {
          const goodPassword = bcrypt.compareSync(
            req.body.password,
            results[0].password
          );
          if (goodPassword) {
            jwt.sign({ results }, process.env.SECRET_KEY_JWT, (err, token) => {
              res.json({ token });
            });
          } else {
            res.sendStatus(500);
          }
        } else res.status(404).send("Email incorrect");
      }
    }
  );
});

router.post("/profil", verifyToken, (req, res) => {
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
