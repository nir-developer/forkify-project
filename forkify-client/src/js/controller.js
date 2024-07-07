import { API_BASE_URL, API_PUBLIC_URL } from "./config.js";
import icons from "url:../../public/img/icons.svg";

const recipeContainer = document.querySelector(".recipe");
console.log(icons);
const loadRecipe = async (id) => {
  try {
    //1.LOAD THE RECIPE FROM API
    const response = await fetch(`${API_BASE_URL}recipes/${id}`);

    const data = await response.json();

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

    //OK
    console.log(recipe);

    ///2)RENDERING RECIPE
    recipeContainer.innerHTML = "";
    const markup = ` <figure class="recipe__fig">
    <img src=${API_PUBLIC_URL}img/recipes/${recipe.imageUrl} alt=${
      recipe.title
    } class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>
        
        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">45</span>
            <span class="recipe__info-text">${recipe.cookingTime}</span>
          </div>
          <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                 <use href="${icons}#icon-plus-circle"></use>
                </svg>
                </button>
            </div>
          </div>
          
          <div class="recipe__user-generated">
            <svg>
             <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class=""><use href="${icons}#icon-"></use> <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients
            .map((ing) => {
              return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
               <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
            `;
            })
            .join("")}
           
          </ul>
        </div>
        
        <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          recipe.publisher
        }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href=${recipe.sourceUrl}
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;

    //const recipeContainer = document.querySelector(".recipe");
    //CLEAR THE RECIPE CONTAINER BEFORE ADDING NEW MARKUP!(The message , etc..)
    // recipeContainer.innerHTML = "";

    //USE INSERT ADJACENT HTML
    // recipeContainer.innerHTML = `${markup}`;
    recipeContainer.insertAdjacentHTML("afterbegin", markup);

    //recipeContainer.innerHTML = html;
  } catch (err) {
    console.error(err.message, err.status);
  }
};

//GREAT ! THIS IS THE RECIPE I CREATED
//loadRecipe("6687c31267110382989d3c8f");

//THIS ID BELONGS TO A RECIPE THAT I HAVE UPLOADED TO THE SERVER WITH AN IMAGE
//loadRecipe("668922452bd5798062a0bd28");
// loadRecipe("668926be2bd5798062a0bd71");
loadRecipe("668a3a63c822d0b3d6ea0dd8");
