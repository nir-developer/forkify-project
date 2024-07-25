import View from "./View.js";
import icons from "url:../../../public/img/icons.svg";
import { Fraction } from "fractional";
import { mark } from "regenerator-runtime";

// const recipeContainer = document.querySelector(".recipe");

//INHERIT EVERYTHING FROM THE VIEW PARENT (except _generateMarkup, and addHandlerRender)
class RecipeView extends View {
  //PARCEL AND BABLEL - INHERITANCE DOES NOT WORK WITH PRIVATE CLASS FIELDS -> SET TO PROJTECTED (_)
  // _data = null;
  _parentElement = document.querySelector(".recipe");
  //DEFAULT ERROR MESSGE -INTRINSTIC TO THE VIEW - THE VIEW SHOULD KNOW BY DEFAULT WHAT TO RENDER!(unless controler pass a message param)
  _errorMessage = "We could not find your recipe. Please try another one!";
  _message = `Start by searching for a recipe or an ingredient. Have fun!`;

  //PUBLISHER FUNCTION:
  //EXECUTED IN TOP LEVEL - LISTEN TO THE 'LOAD' AND 'HASHCHANGED' EVENTS - AND PUBLISH THEM TO THE SUBSCRIBER CB FUNCTION BY CALLING IT!
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );

    handler();
  }

  //SECOND SUBSCRIBER
  /**EVENT DELEGATION - IMPORTANT!!!!
   PARENT ELEMENT(the button): btn--tiny 
   *must use the e to figure out which button is the target element of the click)
   
  for the matching strategy 
  
  
  //DESTRUCTRING DOES NOT WORK IN THIS CASE -
      //THE PROBLEM : SINCE + converts the btn.dataset and then try to access to updateTo
      //const updateTo = +btn.dataset.updateTo;
 */
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      //SELECT THE COMMON CLASS OF THE 2 BUTTONS(BUBBLE UP THE EVENT FROM THE SVG , SPAN CHILDREN)
      //better to select class btn--update-servings, than btn--tiny
      const btn = e.target.closest(".btn--update-servings");

      //GOURD : PREVENT THE NULL RETURN - IF ANY OTHER ELEMENT WAS CLICKED DURING THE BUBBLE(in the recipeContainer)
      if (!btn) return;
      //

      //SOLUTION - PERFORM THE CONVERSION FROM THE STRING - NOT FROM THE OBJECT :btn.dataset!!
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);

      //TEST WITH HARDCODING VALUE(LATER READ THE VALUES FROM THE BUTTONS DATA-SETS!!)
      // console.log(handler(50));
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");

      if (!btn) return;

      // console.log(btn);

      //THIS WILL BOOKMARK THE RECIPE STATE!!
      handler();
    });
  }

  _generateMarkup() {
    const recipe = this._data;

    //console.log(recipe.bookmarked);
    const id = window.location.hash.slice(1);

    // console.log("INSIDE _generateMakrup of RecipeView - the current Recipe:");
    // console.log(recipe);
    return `<figure class="recipe__fig">
        <img src=${recipe.imageUrl} alt="${recipe.title}" class="recipe__img" />
              <h1 class="recipe__title">
                <span>${recipe.title}</span>
              </h1>
            </figure>

            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  recipe.cookingTime
                }</span>
                <span class="recipe__info-text">Minutes</span>
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
                  <button class="btn--tiny btn--update-servings" data-update-to=${
                    recipe.servings - 1
                  }>
                    <svg>
                      <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                  </button>
                  <button class="btn--tiny btn--update-servings" data-update-to=${
                    recipe.servings + 1
                  }>
                    <svg>
                     <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                    </button>
                </div>
              </div>

              <div class="recipe__user-generated">
                
              </div>
               <button class="btn--round btn--bookmark">
                      <svg class="">
                        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
                      </svg>
              </button>
            </div>

            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
                    ${this._renderIngredients(recipe)}

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
  }

  _renderIngredients(recipe) {
    return `${recipe.ingredients
      .map((ing) => {
        let fraction = new Fraction(ing.quantity).toString();
        //console.log(fraction)

        return `
                    <li class="recipe__ingredient">
                        <svg class="recipe__icon">
                            <use href="${icons}#icon-check"></use>
                        </svg>
                        <div class="recipe__quantity">${
                          ing.quantity ? fraction : ""
                        }</div>
                        <div class="recipe__description">
                            <span class="recipe__unit">${ing.unit}</span>
                            ${ing.description}
                        </div>
                    </li>
                `;
      })
      .join("")}`;
  }

  //renderError(errorMessage = this._errorMessage) {}
}

//EXPORT DEFAULT
export default new RecipeView();
//ERROR!!
// export new RecipeView()
