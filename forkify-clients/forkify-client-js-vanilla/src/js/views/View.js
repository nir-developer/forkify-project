import icons from "url:../../../public/img/icons.svg";

//"ABSTRACT CLASS - should not be created never!"
export default class View {
  _data = null;

  render(data, render = true) {
    //GOURD CLAUSE - PREVENT UNDEFINED OBJECT(loadRecipe) AND EMPTY ARRAY(search results) IMPLEMENTED HERE SINCE COMMON TO ALL RENDERER VIEWS!
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    //SET THE DATA OF THE VIEW
    this._data = data;
    // console.log("INSIDE RENDER OF SUBCLASS: ", this);

    this._clear();
    const markup = this._generateMarkup();

    //IMPORTANT - PREVENT RENDERING (FOR THE CASE THE render() of the PreviewView is called - I want to return markup right away)
    if (!render) return markup;

    // console.log(markup);

    //ACTUAL RENDERING!
    //APPEND THE MARKUP WITH THE CURRENT DATA TO THE PARENT CONTAINER
    this._parentElement.insertAdjacentHTML("afterbegin", markup);

    // this._generateMarkup();
  }

  update(data) {
    ///REMOVE THIS  -SINCE IT WILL RENDER AN ERROR ON THE RESULTS VIEW!
    //IF THERE WAS NO SEARCH BEFORE !
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);

    //VDT (DOM TREE REPRESENTATION (not actual) generated after the update!)
    const newElements = Array.from(newDOM.querySelectorAll("*"));

    //Current elements on the actual page(on theUI - before the update!)
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    //ARRAY OF  110 NODES! - THIS IS THE DOM THAT WOULD BE RENDERED ON THE PAGE - IF USING THE RENDER()
    // console.log(curElements);
    // console.log(newElements);

    //COMPARE THE ACTUAL DOM ELEMENTS  ON THE UI WITH THE VDT IN MEMORY DOM TREE
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      //console.log(curEl, curEl.isEqualNode(newEl));

      //1)UPDATES CHANGED TEXT!!!!
      //COMPARE  THE 2 NODES - UPDATE THE CURRENT NODE(ON THE DOM) ONLY IF
      //THE 2 NODES ARE DIFFERENT(SUB TREES) - AND ONLY IF THE DIRECT CHILD OF THE NEW DOM IS NOT TEXT
      //OPTIONAL CHAINING ON THE CHILD - SINCE NOT EXIST ALWAYS!
      //MUST TRIM()!!!!
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        //IMPORTANT
        // console.log("***", newEl.firstChild?.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      //2)UPDATE CHANGED ATTRIBUTES(the data-set attribute : update-to)

      if (!newEl.isEqualNode(curEl)) {
        //LOG THE OBJECT OFF  ALL ATTRIBUTES PROPERTIES THAT HAVE BEEN CHANGED
        //console.log(newEl.attributes);
        //CONVERT THE OBJECT newEl.attributes into Array
        //console.log(Array.from(newEl.attributes));

        //SUPER IMPORTANT: LOOP OVER THE ARRAY OF ALL ATTRIBUTES OF THE NEW ELEMENT - AND UPDATE THEIR VALUE TO THE NEW ELEMNET
        //REPLACING ALL ATTRIBUTES VALUES OF THE CURRENT ELEMENT ON THE DOM BY THE ATTRIBUTE OF HTE NEW VDT
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
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
    //console.error("IN THE RENDER ERRROR VIEW");

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

  //PRIVATE METHODS - COMMON IMPLEMENTATIONS
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
