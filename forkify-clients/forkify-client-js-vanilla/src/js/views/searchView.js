import icons from "url:../../../public/img/icons.svg";

//NOT RENDER ANYTHING!BUT STILL HAS A SUBSCRIBER(SEE THE AddRecipeView : Existing HTML & No subscriber!)
class SearchView {
  //THE FORM
  _parentElement = document.querySelector(".search");

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    //CLEAR THE FORM INPUT
    this._clearInput();

    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }

  addHandlerSubmit(handler) {
    //SUBSCRIBE THE handler ON THE submit event(not enough to only pass the handler - since must prevent default!)
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();

      //READ THE QUERY INPUT

      //const query = document.querySelector(".search__field").value;

      //NOTE : MORE CLEAN TO ADD THES GOURD ON EMPTY QUERY - ON THE CONTROLLER
      // if (query === "") return;

      handler();
    });
  }
}

export default new SearchView();
