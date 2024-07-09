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
    console.log("-----------------------");
    console.error(`CONTROLLER ERROR CATCHED! ${err.message}(${err.stats})`);
  }
};

//WORKS!!
// renderRecipe("668a727a108bd157116126f3");

//E.L
// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipes)
);

//TEST MODEL - GET RECIPE BY ID HARD CODED
// model.loadRecipe("668a7fda108bd1571161292");
// controlRecipes();

// const renderRecipe = async (id) => {
//   try {
//     //EXTRACT THE ID FROM THE HASH IN THE URL (#2323233)
//     //const id = window.location.hash.split("#")[1];
//     const id = window.location.hash.slice(1);
//     if (!id) return;

//     //1) RENDER LOADING SPINNER
//     renderSpinner(recipeContainer);

//     //2.LOAD THE RECIPE FROM API(USING THE MODEL) - MAY THROW (REJECTION PROMISE)
//     await model.loadRecipe(id);

//     const recipe = model.state.recipe;

//     console.log("in controller:");
//     console.log(recipe);

//     ///2)RENDERING RECIPE
//     recipeContainer.innerHTML = "";
//     const markup = ` <figure class="recipe__fig">
//     <img src=${recipe.imageUrl} alt="${recipe.title}" class="recipe__img" />
//           <h1 class="recipe__title">
//             <span>${recipe.title}</span>
//           </h1>
//         </figure>

//         <div class="recipe__details">
//           <div class="recipe__info">
//             <svg class="recipe__info-icon">
//               <use href="${icons}#icon-clock"></use>
//             </svg>
//             <span class="recipe__info-data recipe__info-data--minutes">45</span>
//             <span class="recipe__info-text">${recipe.cookingTime}</span>
//           </div>
//           <div class="recipe__info">
//           <svg class="recipe__info-icon">
//               <use href="${icons}#icon-users"></use>
//             </svg>
//             <span class="recipe__info-data recipe__info-data--people">${
//               recipe.servings
//             }</span>
//             <span class="recipe__info-text">servings</span>

//             <div class="recipe__info-buttons">
//               <button class="btn--tiny btn--increase-servings">
//                 <svg>
//                   <use href="${icons}#icon-minus-circle"></use>
//                 </svg>
//               </button>
//               <button class="btn--tiny btn--increase-servings">
//                 <svg>
//                  <use href="${icons}#icon-plus-circle"></use>
//                 </svg>
//                 </button>
//             </div>
//           </div>

//           <div class="recipe__user-generated">
//             <svg>
//              <use href="${icons}#icon-user"></use>
//             </svg>
//           </div>
//           <button class="btn--round">
//             <svg class=""><use href="${icons}#icon-"></use> <use href="${icons}#icon-bookmark-fill"></use>
//             </svg>
//           </button>
//         </div>

//         <div class="recipe__ingredients">
//           <h2 class="heading--2">Recipe ingredients</h2>
//           <ul class="recipe__ingredient-list">
//           ${recipe.ingredients
//             .map((ing) => {
//               return `<li class="recipe__ingredient">
//               <svg class="recipe__icon">
//                <use href="${icons}#icon-check"></use>
//               </svg>
//               <div class="recipe__quantity">${ing.quantity}</div>
//               <div class="recipe__description">
//                 <span class="recipe__unit">${ing.unit}</span>
//                 ${ing.description}
//               </div>
//             </li>
//             `;
//             })
//             .join("")}

//           </ul>
//         </div>

//         <div class="recipe__directions">
//         <h2 class="heading--2">How to cook it</h2>
//         <p class="recipe__directions-text">
//         This recipe was carefully designed and tested by
//         <span class="recipe__publisher">${
//           recipe.publisher
//         }</span>. Please check out
//             directions at their website.
//           </p>
//           <a
//             class="btn--small recipe__btn"
//             href=${recipe.sourceUrl}
//           >
//             <span>Directions</span>
//             <svg class="search__icon">
//               <use href="${icons}#icon-arrow-right"></use>
//             </svg>
//           </a>
//         </div>`;

//     //const recipeContainer = document.querySelector(".recipe");
//     //CLEAR THE RECIPE CONTAINER BEFORE ADDING NEW MARKUP!(The message , etc..)
//     // recipeContainer.innerHTML = "";

//     //USE INSERT ADJACENT HTML
//     // recipeContainer.innerHTML = `${markup}`;
//     recipeContainer.innerHTML = "";
//     recipeContainer.insertAdjacentHTML("afterbegin", markup);

//     recipeContainer.innerHTML = html;
//   } catch (err) {
//     console.log("-----------------------");
//     console.error(`CONTROLLER ERROR CATCHED! ${err.message}(${err.stats})`);
//   }
// };
