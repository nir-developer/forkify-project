import * as model from "./model.js";
//VIEWS
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
//POLYFILLING:
import "core-js/stable"; //FOR EVERY THING OTHER THAN ASYNC - AWAIT
import "regenerator-runtime/runtime"; //FOR POLYFILING ASYNC - AWAIT

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//PARCEL - HOT RELOAD REPLACEMENT - FOR KEEPING THE SEARCH RESULTS WHEN MODIFYING THE CODE  AND CLICKING SAVE!
//TURN OFF IT DOES PROLEMS(AND IT DOES WHEN SENDING DIFFERENT PAGES FOR SEARCH RESULTS!!)
// if (module.hot) module.hot.accept();
//!!!!!!!!!!!!!!!!!!11
const controlRecipes = async () => {
  try {
    //EXTRACT THE ID FROM THE HASH IN THE URL (#2323233)
    //const id = window.location.hash.split("#")[1];
    const id = window.location.hash.slice(1);

    if (!id) return;

    //1) RENDER LOADING SPINNER
    // recipeView.renderSpinner();

    //0) UPDATE THE RESULTS VIEW TO MARK THE SELECTED SEARCH - USE THE UPDATE DOM ALGORITHM:
    resultsView.update(model.getSearchResultsPage());

    //TO MARK THE BOOKMARK PREVIEW - THE SAME WAY AS ABOVE WITH THE RESULT PREVIEW
    //DEBUG THE INIT()
    //debugger;
    bookmarksView.update(model.state.bookmarks);

    //1) Loading recipe
    await model.loadRecipe(id);

    //2)Rendering recipe
    recipeView.render(model.state.recipe);

    //3) Updating recipe
    // bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    //DEBUG THE ERROR IN THE L.S BOOKMARKS LECTURE - WHEN THE RECIPE WAS NOT FOUND!!
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async (query) => {
  try {
    //0) RENDER THE SPINNER(implementation inherited from View!)
    resultsView.renderSpinner();
    // console.log(resultsView);

    //1) Get search query from the search form (and clean the form right after)
    const query = searchView.getQuery();

    //GOURD CLAUSE HERE(MORE CLEAN THAN IN THE VIEW)
    if (query === "") return;

    // console.log("CONTROLLER - SHOULD  NOT GET HERE IF QUERY EMPTY STRING!");

    await model.loadSearchResults(query);

    //BY DEFAULT PAGE = 1
    resultsView.render(model.getSearchResultsPage());

    //4) RENDER INITIAL PAGINATION BUTTONS
    paginationView.render(model.state.search);
    //NO ASYNC - since the recipes are in the client already
    //resultsView.render(model.getSearchResultsPage(page));
  } catch (err) {
    console.error("CONTROLLER - FAILED TO SEARCH RECIPES!", err);
  }
};

//NOT ASYNC FUNCTION!!!
//HANLDER OF THE PAGINATION BUTTONS CLICK EVENTS - RECIEVES THE PAGE NUMBER(UPDATED FROM THE UI)
//TAKES PARAM!! THE PAGE FROM THE UI RETURNED BACK FROM THE PAGIANTION VIEW FROM DATA-SET
//AND FETCH THE DATA IN THIS PAGE!
//THE PAGE STATE HAS UPDATED ALREADY (OR HAS A DEFAULT OF 1) - MODEL HAS ALREAY
//NO ASYNC!!!! THE RESULTS ARE ALREADY FETCHED - ONCE! IN THE controlSearchReults1
const controlPagination = (goToPage) => {
  //0) NO!!! NO RE LOAD THE RESULTS AGAIN!!! THEY ALREADY LOADED BEOFRELOAD - ALL- RESULTS FOR THE GIVEN PAGE
  // await model.loadSearchResults();

  //1) RENDER - NEW - RESULTS
  resultsView.render(model.getSearchResultsPage(goToPage));

  //RENDER - NEW - PAGINATION BUTTONS
  paginationView.render(model.state.search);
};

//DOM ALGORITHM - LATER!??????
//FOR NOW I REPLACE THE COMPLETE RECIPE VIEW - UNTIL NEXT LEXTURE WITH THE DOM ALOGORITHM
//=> Call the recipeView.render(model.state.recipe) - as before - from the controlServings
const controlServings = (newServings) => {
  //1) UPDATE SERVINGS AND QUANTITIES
  model.updateServings(newServings);

  //2) RENDER - ENTIRE - RECIPE VIEW - LATER OPTIMIZE
  //recipeView.render(model.state.recipe);

  //UPDATE(only text and element attributes)
  recipeView.update(model.state.recipe);

  //1)Update the recipe servings(state)
  //2) Update the View(RecipeView)
};

//TRIGGER WHEN BOOKMARK ICON IS CLICKED
/**
 * 1) IMPORTANT - CATCH HIS BUG!!
 *    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
      if (model.state.recipe.bookmarked) model.deleteBookmark(model.state.recipe.id);

      THE PROBLEM - WHEN NOT BOOKMARK - IT UPDATES THE RECIPE TO BE BOOKMAKRED 
      AND IN THE SECOND IF - IT IS ALREADY BOOKMAKRED- SO IT IS UNBOOKMARKED IT AGAIN!


   2) 

 * 
 */
const controlAddBookmark = () => {
  //Add/Remove a bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
  //(CHECK WHY DOES NOT WORK WITH UPDATE() INSTEAD OF RENDER
  //bookmarksView.update(model.state.bookmarks);
};

//IMPORTANT - THIS HANDLER IS PART OF THE SOLUUTION TO THE BUG OF THE UPDATE VIEW METHOD
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
//
//NOTE: the controls
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSubmit(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  //WRONG - ERROR!! SINCE NO RECIPE HAS ARRIVED FROM API YET!
  //INSTEAD  - CALL THIS CONTROLLER FOR TESTING - AT THE END OF THE controlRecipes()!!
  //controlServings(30);
};

init();
