import View from './View';
import {Fraction} from 'fractional';

//MUST BOTH IMPORT IT HERE AND IN THE VIEW BASE CLASS!!!!
import icons from 'url:../../img/icons.svg' //PARCEL 2: FOR ANY ASSET WHICH IS NOT A PROGRAMMING FILE(IMAGES, ICONS, VIDEO,,)


class RecipeView extends View{
    
  //MOVED TO BASE CLASS
    //#data; 

    _parentElement = document.querySelector('.recipe')
    _errorMessage = 'We could not find your recipe. Please try another one!'
    _message = ``


  //THIS PUBLISHER VIEW DOES NOT KNOW HOW TO REACT TO EVENT 
  //DOES NOT HOW WHO IS THE ACTUAL HANDLER FUNCTION
  //THE PUBLISHER HAS NO CONTROL
    addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler))

  }

  //REGISTER THE HANDLER FOR UPDATE SERVINGS ON THE updating quantities buttons 
  //EVENT DELEGATION ON THE common closet parent
   addHandlerUpdateServings(handler)
   {
    this._parentElement.addEventListener('click', function(e){
      //Find  the updating button closest parent with the class tiny--btn
      console.log('INSIDE EVENT HANDLER IN THE VIEW')
      const btn = e.target.closest('.btn--tiny'); 
      //GOURD CLAUSE
      if(!btn) return; 

      console.log(btn)

      console.log(`RecipeView Click handler dataset value on the button after clicking it: ${btn.dataset.updateTo}`)
     
    })
    
     
   }

  /**
   * NOTE - FOR NOW REMOVE THE USER ICON : 
   *       <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
   */
    _generateMarkup()
    {
        const recipe = this._data;

        //IMPORTANT: UPDATE THE SERVINGS VALUE  OF THIS RECIPE ON THE VIEW - BY STORING THE +-1 RELATIVE TO THE CURRENT SERVINGS 
        //SO WHEN THE USER WILL CLICK THE UPDATING BUTTONS  - THEN THE +-1 VALUES WILL BE THERE ALREADY 
        //WITHOUT THE CONTROLLER HANDLER UPDATING IT - KEEP IT THIN 
        //USE THE DATASET !! data-update-to
        
       return  `
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">4</span>
            <span class="recipe__info-text">${recipe.servings}</span>

            <div class="recipe__info-buttons">
              <button  class="btn--tiny btn--increase-servings" data-update-to="${this._data.servings - 1}">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-update-to="${this._data.servings + 1}">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(ing => {
                let fraction = new Fraction(ing.quantity).toString() 
                //console.log(fraction)
               
                return `
                    <li class="recipe__ingredient">
                        <svg class="recipe__icon">
                            <use href="${icons}#icon-check"></use>
                        </svg>
                        <div class="recipe__quantity">${ing.quantity ? fraction: '' }</div>
                        <div class="recipe__description">
                            <span class="recipe__unit">${ing.unit}</span>
                            ${ing.description}
                        </div>
                    </li>
                `
            }).join('')}

          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `
    }

 }


 //PREVENTING MULTIPLE INSTANCES OF THIS CLASS FROM BEING CREATED!
 export default new RecipeView(); 




