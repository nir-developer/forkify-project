const globalErrorHandler = require("./errorController");
const AppError = require("../utils/appError");
const Recipe = require("../models/Recipe");

//MULTER CONFIGURATION
const path = require("path");
const multer = require("multer");

/**MULTER: STEP 1 - CREATE A MULTER STORAGE (Destination and filename!!)
//  1.cb param: is like next() in express - used to pass errors !)
//      first arg: if there are error ,
//       second arg: location on disk
//
  2. filename option: (req,file, cb) => {}
 */
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/recipes");
  },
  filename: (req, file, cb) => {
    //recipe-2323232323-2333434.jpg
    //EXTRACT THE FILE NAME FROM req.file  - THE FILE SECOND PARAM!
    const ext = file.mimetype.split("/")[1];
    //Call the next/cb - with null error param ,
    // and with the  file name I want
    //LATER - WITH REQ.USER.id cb(null, `recipe-${}`)
    //EXPECTED FILE NAME - 2323232323-pizza.jpeg
    console.log("**************************");
    console.log(req.body);
    //WORKS: image_url: 'recipe-1720332019105.jpeg',
    cb(null, `recipe-${Date.now()}.${ext}`);
    //I WANT THE URL VALUE!! FOR THE CLIENT  -http://localhost:3000/public/
    //IMPOSSIBLE!!!!!!!!! MULTER FILE NAME CAN TAKE ONLY FILE NAME ! NOT ENTIRE PATH - SINCE DEPENDS F.S!! -
    //SEE SOLUTION CHAT -GPT - BUIDD THE PATH IN THE UPLOAD CONTROLER BELOW
    //cb(null, `http://localhost:3000/public/recipe-${Date.now()}.${ext}`);
  },
});

//2) CREATE A MULTER FILTER
//(The goal of my cb is to test if the file is an image
// - if so then pass true and vise versa )
//IF I WANT THEU USER TO UPLOAD CSV FILES etc... - THEN I CAN TEST FOT THIS
const multerFilter = (req, file, cb) => {
  //TEST THE MIME TYPE(NOTE - FOR ANY TYPE OF IMAGE - (img, jpg, ,png, bitmap, tif -THE MIME TYPE WILL ALWAYS START WITH 'image'))
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    //PASS THE CB/NEXT AN ERROR - LATER HANDLE THIS ERROR BY RETURNING A JSON ERROR RESOPNSE! SINCE NOW IT'S HTML!!
    //cb(new Error("Not an image! Please upload only image."), false);
    cb(new AppError("Not an image! Please upload only images!", 400));
  }
};

//AT THE BEGINNING
//const upload = multer({ dest: "public/img/recipes" });
//STEP 3: CREATE THE UPLOAD BASED ON THE MULTER STORAGE AND THE MULTER FILTER
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single("image_url");

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

/**
 * IMPORTANT!!! 
 *  1) PARSE THE ARRAY FROM A STRING TO ARRAY OBJECT!!
          ingredients: JSON.parse(req.body.ingredients),
          
    2) MY MULTER  M.W SHOULD PARSED ALREADY THE IMAGE!
          image_url: req.file,

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    1.  IMPORTANT - MY MULTER  M.W SHOULD PARSED ALREADY THE IMAGE!
      image_url: req.file ? req.file.filename : "default.jpg",
     `http://localhost:3000/public/img/recipes/${req.file.filename}`
    
    2.  I NEED TO BUILD THE ABSOLUTE PATH URL OF THE RECIPE IMAGE 
       BUT IT CAN NOT BE DONE BY SETTING THE ABSOLUTE PATH USING  MULTER M.W  AS THE FILE NAME!! 
       => SHOULD CONSTRUCT THE ABSOLUTE PATH HERE IN THE CONTROLLER BY APPENDING THE MULTER (req.file.filename) TO THE END OF THE PATH!
    
    3.  IMPORTANT - I SET THE Recipe Model with set Schema method to transform image field ane
     to image_url in the response(result set for the client app)
     => WHEN CREATING / SAVING THE RECIPE - I NEED TO PASS THE FIELD NAME 'image' 
     BUT SETTING IT'S VALUE TO THE ABSOLUTE PATH (SEE)

    
     4.MUST JSON PARSE THE ARRAY OF INGREDIENTS FROM A STRING TO JS OBJECT!


>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
 */
exports.uploadRecipe = async (req, res, next) => {
  console.log("FILE PATH:");
  const filePath = `http://localhost:3000/public/img/recipes/${req.file.filename}`;
  console.log(filePath);

  try {
    let recipe = {
      title: req.body.title,
      publisher: req.body.publisher,
      cooking_time: req.body.cooking_time,
      servings: req.body.servings,
      source_url: req.body.source_url,
      //IMPORTANT!!! PARSE THE ARRAY FROM A STRING TO ARRAY OBJECT!!
      ingredients: JSON.parse(req.body.ingredients),

      image: req.file ? filePath : "default.jpg",
    };

    // console.log(recipe.image_url);
    // console.log(recipe)

    // //ADD THENAME THE IMAGE AS THE
    // let image_url;
    // if (req.file) image_url = req.file.filename;

    //recipe-1720262505090.jpeg - OK !!
    //console.log(image_url);

    recipe = await Recipe.create(recipe);

    console.log("SUCCESS CREATED RECIPE!!");

    console.log(recipe);

    res.status(201).json({
      status: "success",
      data: {
        recipe,
      },
    });
  } catch (err) {
    console.log("Failed to upload recipe", err.message);
    res.status(500).json({ status: 500, message: err.message });
  }
};
