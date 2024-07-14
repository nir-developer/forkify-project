import { API_BASE_URL } from "./config";
import { getJSON } from "../../helpers";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
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

    // console.log("MODEL - RECIPES:");
    // console.log(recipes);

    //update the searchResults state
    // state.search.results = recipes;

    console.log(
      "Model inside loadSearchResults: Update state after success fetched : "
    );
    // console.log(state);
  } catch (err) {
    console.error(`Model loadSearchResults error: ${err.message}`);
  }
};

//TEST - API PERFECT!!
// loadSearchResults("PizZa");
