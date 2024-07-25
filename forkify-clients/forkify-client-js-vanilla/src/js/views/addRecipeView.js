import icons from "url:../../../public/img/icons.svg";

import View from "./View";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  //Top navigation bar
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandleHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  //Call the _toggle method with the correct this context bound to it
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandleHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  //FORM SUBMISSION HANDLER - CONTROLLER INTERVENE!!!
  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      //1) PREVENT DEFAULT FORM SUBMISSION
      e.preventDefault();
      //DOM ELEMENT BUT NEVER MIND SINCE DONT NEED THE THIS CONTEXT IN THIS METHOD
      //console.log(this);

      //2) Extract Form Data(THIS TIME - PASS DOM ELEMENT - USING THIS  - WHICH IS THE DOM)

      //3) Transform FormData object into an array by spreading FormData into an array
      const dataArr = [...new FormData(this)];
      //console.log(dataArr);

      const newRecipe = Object.fromEntries(dataArr);
      // console.log(newRecipe);

      handler(newRecipe);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();

//ERROR - SINCE USING this key work inside a handle
// this CONTEXT IS TO THE DOM ELEMENT - MUST BIND this to the CURRENT INSTANCE

// _addHandlerShowWindow() {
//   this._btnOpen.addEventListener("click", function () {
//     //toggle - can be used to reuse !  add/remove class if not there /there
//     this._overlay.classList.toggle;
//   });
//}
