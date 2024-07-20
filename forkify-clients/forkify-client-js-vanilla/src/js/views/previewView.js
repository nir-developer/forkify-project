import View from "./View";

//IMPORTANT!!
//An instance of this class - is created when the _generateMarkup of either   BookmarksView or RecipeViews
//in the loop - in each iteration - calls :
//const markup = this._data.map(bookmark => previewView.render(bookmark, false)).join("")
//THE RENDER METHOD - BOTH SET THE _data property of the previewView instance to the bookmark (or recipe when called by the recipeView
//AND ALSO RETURN THE MARKUP STRING(since passed in render = false parameter)
//=>IN THE LOOP OF THE _generateMarkup - the call to  render() and not calling to _generateMarkup
// is required!!!! SINCE THE _data property is must set first!!

//EMPTY PARENT - AND NO OTHER PROPERTIES!!
class PreviewView extends View {
  _parentElement = "";

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
        <li class="preview">
            <a class="preview__link ${
              this._data.id === id ? "preview__link--active" : ""
            }" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.imageUrl}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
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

export default new PreviewView();
