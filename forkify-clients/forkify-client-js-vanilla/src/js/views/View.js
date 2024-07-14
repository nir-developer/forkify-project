import icons from "url:../../../public/img/icons.svg";

//"ABSTRACT CLASS - should not be created never!"
export default class View {
  //PRIVATE METHODS - COMMON IMPLEMENTATIONS
  _data = null;

  render(data) {
    //GOURD CLAUSE - PREVENT UNDEFINED OBJECT(loadRecipe) AND EMPTY ARRAY(search results) IMPLEMENTED HERE SINCE COMMON TO ALL RENDERER VIEWS!
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    //SET THE DATA OF THE VIEW
    this._data = data;
    // console.log("INSIDE RENDER OF SUBCLASS: ", this);

    this._clear();
    const markup = this._generateMarkup();

    //APPEND THE MARKUP WITH THE CURRENT DATA TO THE PARENT CONTAINER
    this._parentElement.insertAdjacentHTML("afterbegin", markup);

    // this._generateMarkup();
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

  _clear() {
    this._parentElement.innerHTML = "";
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
}
