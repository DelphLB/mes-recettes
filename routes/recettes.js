const express = require("express");
const router = express.Router();
const connection = require("../config");

//Get all recipes

router.get("/", (req, res) => {
  connection.query("SELECT * FROM recipes ", (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});
module.exports = router;

//Obtenir les recettes d'un utilisateur en particulier
router.get("/user/:id", (req, res) => {
  connection.query(
    "SELECT title, ingredients, material, image, instructions, savory, sweet, name, nickname, user_id FROM recipes as r JOIN users ON r.user_id=users.id WHERE users.id =? ",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error");
      } else {
        if (results === 0) {
          return res.status(404).send(" not found");
        } else {
          res.json(results);
        }
      }
    }
  );
});

//Post a recipe

router.post("/", (req, res) => {
  const {
    title,
    ingredients,
    material,
    image,
    instructions,
    savory,
    sweet,
    lactose,
    veggie,
    level,
    portions,
  } = req.body;
  connection.query(
    "INSERT INTO playlist (title, ingredients, material, image, instructions, savory, sweet, lactose, veggie, level, portions) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      title,
      ingredients,
      material,
      image,
      instructions,
      savory,
      sweet,
      lactose,
      veggie,
      level,
      portions,
    ],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Recette non envoyée");
      } else {
        res.status(200).send("Rectte envoyée ! File en cuisine");
      }
    }
  );
});

module.exports = router;
