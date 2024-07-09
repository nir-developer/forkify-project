import { API_BASE_URL } from "./config";
export const state = {
  recipe: {},
};

export const loadRecipe = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}recipes/${id}`);

    const data = await response.json();

    //data in this case from my api: {status: , message:}
    if (!response.ok) throw data;

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
    console.error(`MODEL ERROR CATCHED! ${err.message}(${err.status})`);
    console.log("MODEL: err");
    console.log(err);
    //RE-THROW!! OTHERWISE WILL NOT PROPAPAGE TO CONTROLLER - SINCE "HANDLED"
    throw err;
    // throw new Error(err.message);
  }
};
