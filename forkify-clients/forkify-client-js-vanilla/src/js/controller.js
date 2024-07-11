import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
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

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
