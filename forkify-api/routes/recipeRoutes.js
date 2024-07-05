const recipeController = require("../controllers/recipeController");
const express = require("express");

const router = express.Router();

router.route("/").get(recipeController.getAllRecipesByKeyWord);

router.route("/:id").get(recipeController.getRecipe);

module.exports = router;
