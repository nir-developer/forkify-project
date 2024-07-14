import icons from "url:../../../public/img/icons.svg";

import View from "./View";
class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your query!Please try again:)";
  _message = "";

  _generateMarkup() {
    const markup = this._data.map(this._generatePreview).join("");

    return markup;
  }

  /**
   //SUPER IMPORTANT:
   //IMPORTANT: INJECT THE ID INTO THE LINK IN THE URL HASH -SO WHEN THE USER CLICKS ON THE PREVIEW
   //THE HASH WILL GET THIS URL - AND THEN THE RECIPE
   //FOR NOW REMOVE THE ACTIVE CLASS -
   //LATER - WHEN IMPLEMNET THE UPLOADING RECIPE - ADD THE ICON (SVG) OF USER
    

    FOR UPLOADING - LATER!!

            <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
   * 
   */
  _generatePreview(result) {
    return `
    <li class="preview">
            <a class="preview__link" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.imageUrl}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
  }
}

// new ResultsView().printInfo();
//SINGLETON!!
export default new ResultsView();

// export default new ResultsView();
