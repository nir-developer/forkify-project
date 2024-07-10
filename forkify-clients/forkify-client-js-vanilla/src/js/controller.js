import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
//POLYFILLING:
import "core-js/stable"; //FOR EVERY THING OTHER THAN ASYNC - AWAIT
import "regenerator-runtime/runtime"; //FOR POLYFILING ASYNC - AWAIT

import { API_BASE_URL } from "./config.js";
import icons from "url:../../public/img/icons.svg";

// const recipeContainer = document.querySelector(".recipe");

// const renderSpinner = (parentEl) => {
//   const markup = `
//         <div class="spinner">
//           <svg>
//             <use href="${icons}#icon-loader"></use>
//           </svg>
//         </div> `;

//   //CLEAR PREVIOUS MARKUP
//   parentEl.innerHTML = "";
//   parentEl.insertAdjacentHTML("afterbegin", markup);
// };

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
    console.error(`CONTROLLER ERROR CATCHED! ${err.message}(${err.stats})`);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
