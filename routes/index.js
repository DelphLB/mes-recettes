const express = require("express");
const router = express.Router();

const recettes = require("./recettes");

router.use("/recettes", recettes);

router.get("/", (req, res) => {
  res.send("OK");
});
module.exports = router;
