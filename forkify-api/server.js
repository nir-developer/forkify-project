const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const Recipe = require("./models/Recipe");

const mongoose = require("mongoose");

// const PORT = process.env.PORT || 3000;

let DB;

if (process.env.NODE_ENV === "development") DB = process.env.DB_COMPASS;
else if (process.env.NODE_ENV === "production") DB = process.env.DB_ATLAS;

// let DB
// if(process.env.NODE_ENV === 'development' ) DB = process.env.DB_COMPASS
// else if(process.env.NODE_ENV === 'production') DB = process.env.DB_ATLAS;
// else throw new Error('INVALID ENVIRONMENT VARIABLE')
//const DB = process.env.NODE_ENV === 'development' ? process.env.DB_COMPASS : process.env.DB_ATLAS

// const DB_ATLAS = process.env.DB_ATLAS;
// const DB_COMPASS = process.env.DB_COMPASS
const PORT = process.env.PORT || 3000;

mongoose
  .connect(DB)
  .then(() => {
    console.log(`CONNECTED TO DB ON ${DB}`);
    app.listen(PORT, () => console.log(`WEB SERVER LISTEN ON ${PORT} `));

    //CREATE A TEST RECIPE
    //console.log('SERVER:GOING TO CREATE A TEST RECIPE...')
    //return createTestRecipe();
  })
  .catch((err) => console.log(err.message));

/////////////////////////////////////
//CREATE A TEST RECIPE
const createTestRecipe = () => {
  const recipe = new Recipe({
    title: "VS CODE RECIPE",
    ingredients: [
      {
        quantity: 23,
        unit: "gram",
        description: "TEST INGREDIENT DESCRIPTION!",
      },
    ],
  });

  return recipe.save();
};
