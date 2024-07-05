const globalErrorHandler = require("./errorController");
const AppError = require("../utils/appError");
const Recipe = require("../models/Recipe");

//RETURN PREVIEWS!
exports.getAllRecipesByKeyWord = async (req, res) => {
  try {
    let searchTerm = req.query.search;
    if (!searchTerm)
      return res.status(400).json({
        status: "fail",
        message: "Search term query must be provided",
      });

    console.log(searchTerm);

    // Extract the relevant keyword(s) from the search term and create a regex pattern
    const words = searchTerm.match(/\b(\w+)\b/g); // Extract whole words from the search term
    const regexPattern = words.map((word) => `\\b${word}\\b`).join("|"); // Create a regex pattern for whole words

    const recipes = await Recipe.find({
      title: { $regex: regexPattern, $options: "i" },
    });

    return res.status(200).json({
      status: "success",
      results: recipes.length,
      data: {
        recipes,
      },
    });
  } catch (err) {
    console.log("Failed to get All Recipes by key word", err.message);
    res.status(500).json({ status: 500, message: err.message });
  }
};

exports.getRecipe = async (req, res, next) => {
  try {
    if (!req.params.id)
      return res
        .status(400)
        .json({ status: "fail", message: "id not provided" });

    console.log(req.params.id);
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe)
      return next(
        new AppError(
          `Could not find a recipe with the given id ${req.params.id}`,
          404
        )
      );
    // if (!recipe)
    //   return res.status(404).json({
    //     status: "fail",
    //     message: "Could not find a recipe with the given id",
    //   });

    console.log(recipe);
    return res.status(200).json({
      status: "success",
      data: {
        recipe,
      },
    });
  } catch (err) {
    console.log("Failed to load recipe by id", err.message);
    res.status(500).json({ status: 500, message: err.message });
  }
};
