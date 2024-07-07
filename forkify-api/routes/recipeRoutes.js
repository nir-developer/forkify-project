const recipeController = require("../controllers/recipeController");
const express = require("express");

//MULTER - LATER WILL BE MOVED TO RECIPE CONTROLLER WITH MORE CONIFGURATIONS
// const multer = require("multer");
// const upload = multer({ dest: "public/img/recipes" });

const router = express.Router();

router.route("/").get(recipeController.getAllRecipesByKeyWord).post(
  //upload.single("image_url"),
  recipeController.uploadUserPhoto,
  recipeController.uploadRecipe
);

router.route("/:id").get(recipeController.getRecipe);

module.exports = router;
