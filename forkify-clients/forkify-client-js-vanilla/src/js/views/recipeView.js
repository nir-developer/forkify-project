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

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> `;

    this._clear();
    //AT RUN TIME - this will have the specific _parentElement which is not a class field on this base class!
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //AT RUN TIME - this will have the specific _errorMessage which is not a class field on this base class!
  renderError(message = this._errorMessage) {
    console.error("IN THE RENDER ERRROR VIEW");
    // this._clear();
    const markup = `
          <div class="error">
            <div>

              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    //AT RUN TIME - this will have the specific _parentElement which is not a class field on this base class!
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //FOR SUCCESS MESSAGE(LATER ..)
  renderMessage(message = this._message) {
    console.log("INSIDE renderMessgae");
    const markup = ` 
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
     
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  render(data) {
    //INITIAL THE DATA property
    this._data = data;

    //CLEAR THE PARENT CONTAINER
    this._clear();
    const markup = this._generateMarkup();

    //APPEND THE MARKUP WITH THE CURRENT DATA TO THE PARENT CONTAINER
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkup() {
    const recipe = this._data;
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
                
              </div>
              <button class="btn--round">
                <svg class=""><use href="${icons}#icon-"></use> <use href="${icons}#icon-bookmark-fill"></use>
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
