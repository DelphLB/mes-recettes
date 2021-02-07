const express = require("express");
const router = express.Router();

const users = require("./users");
const recettes = require("./recettes");

router.use("/users", users);
router.use("/recettes", recettes);

router.get("/", (req, res) => {
  res.send("OK");
});
module.exports = router;
