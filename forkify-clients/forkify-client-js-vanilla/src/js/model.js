import { API_BASE_URL } from "./config";
import { getJSON } from "../../helpers";
export const state = {
  recipe: {},
};

export const loadRecipe = async (id) => {
  try {
    // const response = await fetch(`${API_BASE_URL}recipes/${id}`);
    // const data = await response.json();
    // if (!response.ok) throw data;
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
    // throw new Error(err.message);
  }
};
