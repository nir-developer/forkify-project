import { API_BASE_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "../../helpers";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RES_PER_PAGE, //For the computation
    //THE CURRENT PAGE IS A STATE! SINCE IT IS UPDATED ON THE UI
    page: 1,
  },
};

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_BASE_URL}recipes/${id}`);

    let { recipe } = data.data;

    //CONVERT API FIELDS
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    ///UPDATE THE STATE
    state.recipe = recipe;
  } catch (err) {
    console.error(`${err} *** (MODEL)`);
    //RE-THROW!! TO MARK THIS PROMISE AS REJECTED -TO PROPAPAGE TO THE CONTROLLER
    //OTHERWISE WILL NOT PROPAGATE TO CONTROLLER - SINCE "HANDLED"
    throw err;
  }
};

//http://localhost:3000/api/v1/recipes?search="PizzA"
export const loadSearchResults = async (query) => {
  try {
    //update the query state- for analatyics
    state.query = query;

    const data = await getJSON(`${API_BASE_URL}recipes?search=${query}`);

    if (data.status === "fail") throw data;

    if (data.results === 0)
      throw new Error(`No recipe found for ${query}, please try another one`);

    // const { recipes } = data.data;

    //2.RENAME API's PROPERTIES NAMES
    const recipes = data.data.recipes.map((rec) => {
      return {
        publisher: rec.publisher,
        imageUrl: rec.image_url,
        title: rec.title,
        id: rec.id,
      };
    });

    //UPDATE THE STATE!
    // state.search.results = recipes;
    state.search.results = recipes;

    console.log("MODEL- AFTER CONVERTING PREVIEWS FROM API TO CLIENT NAMING: ");
    console.log(state.search.results);

    console.log(
      "Model inside loadSearchResults: Update state after success fetched : "
    );
    // console.log(state);
  } catch (err) {
    console.error(`Model loadSearchResults error: ${err.message}`);
  }
};

//page = 1,2,,,,
//slice(0,10) //extract the 10!)
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;

  // console.log(`start = ${start}, end = ${end}`);

  // const results = state.search.results.slice(start, end);
  // console.log(results);
  return state.search.results.slice(start, end);
};

// const getNewQuantity = (oldQuantity, oldServings, newServings) =>
//   (oldQuantity * newServings) / oldServings;

//newQuantity = (quantity * newServings) / servings
export const updateServings = (newServings) => {
  //1.Update the servings state to newServings
  //console.log(`model: before update: ${state.recipe.servings}`);

  // state.recipe.servings = newServings;

  console.log(`model: statue before update servings and quantities:`);
  console.log(state.recipe);
  // const oldServings = state.recipe.servings;

  //JONAS
  //SIDE EFFECT! MUTATE THE ARRAY - TRY BELOW IMMUTABLE
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

// const getNewQuantity = (oldQuantity, oldServings, newServings) =>
//   (oldQuantity * newServings) / oldServings;

// updateServings(10);
//TEST - API PERFECT!!
// loadSearchResults("PizZa");

// state.recipe.ingredients.forEach((ing) => {
//   ing.quantity = getNewQuantity(
//     ing.quantity,
//     state.recipe.servings,
//     newServings
//   );

//   state.recipe.servings = newServings;
// });

//IMMUTABLE!!!!!!!!!!!!!!!!!!!!!!
//TRY TO IMPLEMENT WITH IMMUTABLE
// const newIngredients = state.recipe.ingredients.map(
//   ((ing) => ing.quantity * state.recipe.servings) / newServings
// );

// console.log(newIngredients);
// state.recipe = {
//   ...state.recipe,
//   ingredients: newIngredients,
//   servings: newServings,
// };
