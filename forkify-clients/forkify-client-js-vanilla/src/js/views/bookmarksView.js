import icons from "url:../../../public/img/icons.svg";
import previewView from "./previewView";

import View from "./View";
class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No recipes found for your query!Please try again:)";
  _message = "No bookmarks yet. Find a nice recipe and bookmark it";

  // _generateMarkup() {
  //   const markup = this._data

  //     //IMPORTANT - THE render function in this case must return a string markup!
  //     //IMPORTANT - WHY NOT CALLING previewView.generateMarkup() ? Since I need to set the _data first in the render() !
  //     .map((bookmark) => previewView.render(bookmark, false))
  //     .join("");

  //   return markup;
  // }

  ///////////////////////////////////////////////////////////
  //BEFORE REFACTORING BY EXTRACTING THE _generatePreview to  PreviewView!! with the local _generatePreview
  ///////////////////////////////////////
  // _generateMarkup() {
  //   const markup = this._data.map(this._generatePreview).join("");

  //   return markup;
  // }

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
    const id = window.location.hash.slice(1);

    return `
        <li class="preview">
            <a class="preview__link ${
              result.id === id ? "preview__link--active" : ""
            }" href="#${result.id}">
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
export default new BookmarksView();

// export default new ResultsView();
