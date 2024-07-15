const recipeController = require("../controllers/recipeController");
const express = require("express");

//MULTER - LATER WILL BE MOVED TO RECIPE CONTROLLER WITH MORE CONIFGURATIONS
// const multer = require("multer");
// const upload = multer({ dest: "public/img/recipes" });

const router = express.Router();

//ADMIN ROUTES
router.route("/recipes").get(recipeController.getAllRecipes);
module.exports = router;
