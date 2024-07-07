const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      // Optionally add validation rules here
    },
    unit: {
      type: String,
      // Optionally add validation rules here
    },
    description: {
      type: String,
      // Optionally add validation rules here
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
  //   { _id: false }
); // Disable _id for ingredients schema

ingredientSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    // ret.id = ret._id; // Replace _id with id
    delete ret._id; // Remove _id field from the response
    delete ret.__v; // Optionally remove __v field if not needed
    return ret;
  },
});

/////////////////////////
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe must have a title"],
    },
    publisher: {
      type: String,
      required: [true, "Recipe must have a publisher"],
    },
    source_url: {
      type: String,
      required: false,
    },
    // image_url: {
    //   type: String,
    //   default: "default.jpg",
    // },
    /**
     * I WANT TO ACCEPT THE name = image - FROM DATA in the request 
     * - AND STORE THIS VALUE IN THE image field of the document 
     *THEN - I WANT TO  SEND IT BACK IN THE RESPONSE BY RENAME IT TO image_url 
      and set value to the URL for the client to load!! 
      
     */
    image: {
      type: String,
      default: "default.jpg",
    },

    servings: {
      type: Number,
      //required: [true, "Recipe must have a value of number of servings"],
    },
    cooking_time: {
      type: Number,
      //required: [true, "Recipe must have a value of cooking time"],
    },
    ingredients: [ingredientSchema], // Use the ingredientSchema for ingredients
  },

  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

recipeSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    ret.id = ret._id; // Replace _id with id
    delete ret._id; // Remove _id field from the response
    ret.image_url = ret.image; //Replace image with image_id
    delete ret.image; //Remove the image from the response
    delete ret.__v; // Optionally remove __v field if not needed
    return ret;
  },
});

///SETTER TO TO REMOVE THE _v FROM THE RESULT SET
// recipeSchema.set("toJSON", {
//   transform: (doc, ret, options) => {
//     delete ret.__v;
//     return ret;
//   },
// });
//CREATE A TEXT INDEX TO  MY MONGOOSE SHEMA DEFINITION - so I WILL BE ABLE TO USE THE $text MONGODB OPERATOR IN THE FIND QUERY
recipeSchema.index({ title: "text" });
const Recipe = new mongoose.model("recipe", recipeSchema);

module.exports = Recipe;

/**
 * {
    "id": "5ed6604591c37cdc054bcd09",
    "title": "Cauliflower Pizza Crust (with BBQ Chicken Pizza)",
    "publisher": "Closet Cooking",
    "source": "http://feedproxy.google.com/~r/ClosetCooking/~3/xvkmVGnlXNQ/cauliflower-pizza-crust-with-bbq.html",
    "image": "http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg",
    "servings": 4,
    "cookingTime": 75,
    "ingredients": [
        {
            "quantity": 1,
            "unit": "",
            "description": "medium head cauliflower cut into florets"
        },
        {
            "quantity": 1,
            "unit": "",
            "description": "egg"
        },
        {
            "quantity": 0.5,
            "unit": "cup",
            "description": "mozzarella shredded"
        },
        {
            "quantity": 1,
            "unit": "tsp",
            "description": "oregano or italian seasoning blend"
        },
        {
            "quantity": null,
            "unit": "",
            "description": "Salt and pepper to taste"
        },
        {
            "quantity": 1,
            "unit": "cup",
            "description": "chicken cooked and shredded"
        },
        {
            "quantity": 0.5,
            "unit": "cup",
            "description": "barbecue sauce"
        },
        {
            "quantity": 0.75,
            "unit": "cup",
            "description": "mozzarella shredded"
        },
        {
            "quantity": null,
            "unit": "",
            "description": "Red onion to taste thinly sliced"
        },
        {
            "quantity": null,
            "unit": "",
            "description": "Fresh cilantro to taste"
        }
    ]
}
 */
