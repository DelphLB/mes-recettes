const express = require("express");
const router = express.Router();

const users = require("./users");
const recettes = require("./recettes");

const profile = require("./profile");

router.use("/profile", profile);

router.use("/users", users);
router.use("/recettes", recettes);

router.get("/", (req, res) => {
  res.send("OK");
});
module.exports = router;
