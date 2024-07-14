import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
//THE SEARCH FORM
import searchView from "./views/searchView.js";
//POLYFILLING:
import "core-js/stable"; //FOR EVERY THING OTHER THAN ASYNC - AWAIT
import "regenerator-runtime/runtime"; //FOR POLYFILING ASYNC - AWAIT

const controlRecipes = async () => {
  try {
    //EXTRACT THE ID FROM THE HASH IN THE URL (#2323233)
    //const id = window.location.hash.split("#")[1];
    const id = window.location.hash.slice(1);

    if (!id) return;

    //1) RENDER LOADING SPINNER
    recipeView.renderSpinner();

    //2.LOAD THE RECIPE FROM API(USING THE MODEL) - MAY THROW (REJECTION PROMISE)
    await model.loadRecipe(id);

    //3)GET RECIPE FROM MODEL AND RENDER IT IN THE VIEW
    recipeView.render(model.state.recipe);
  } catch (err) {
    //HANDLE ERROR BY RENDERING THE MESSAGE ON THE UI!!
    //console.log(`CONTROLLER - ${err}`);
    //IF CALLING WITHOUT ERR THE INJECTED ERR - THEN THE VIEW WILL RENDER IT'S OWN DEFAULT ERROR
    //INJECT A MEANINGFUL MESSAGE - NOT THE ORIGINAL ONE FROM (err)
    // recipeView.renderError(err);
    recipeView.renderError();

    // console.error(
    //   `CONTROLLER ERROR CATCHED! ${err.message}(${err.statusCode})`
    // );
  }
};

const controlSearchResults = async (query) => {
  try {
    //1) Get search query from the search form (and clean the form right after)
    const query = searchView.getQuery();

    //GOURD CLAUSE HERE(MORE CLEAN THAN IN THE VIEW)
    if (query === "") return;

    // console.log("CONTROLLER - SHOULD  NOT GET HERE IF QUERY EMPTY STRING!");

    await model.loadSearchResults(query);

    const recipes = model.state.search.results;

    console.log("CONTROLLER - RECIPES FROM MODEL FOR THE QUERY:", query);
    console.log(recipes);
  } catch (err) {
    console.error("CONTROLLER - FAILED TO SEARCH RECIPES!");
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSubmit(controlSearchResults);
};

init();

controlSearchResults("PizzA");
