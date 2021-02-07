const express = require("express");
const router = express.Router();
const connection = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Get all users
 */
router.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

/**
 * Add new user
 */
router.post("/", (req, res) => {
  const { name, nickname, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);

  connection.query(
    "INSERT INTO users (name, nickname, password) VALUES(?, ?, ?)",
    [name, nickname, passwordHash],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("error with the user");
      } else {
        res.status(200).send("user saved with success");
      }
    }
  );
});

router.post("/login", (req, res) => {
  const { nickname, password } = req.body;

  connection.query(
    "SELECT * FROM users WHERE nickname = ?",
    [nickname],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const goodPassword = bcrypt.compareSync(password, result[0].password);
        if (goodPassword) {
          jwt.sign({ result }, process.env.SECRET_KEY_JWT, (err, token) => {
            res.json({ token });
          });
        } else {
          res.status(500).send("mot de passe incorrect");
        }
      }
    }
  );
});
module.exports = router;
