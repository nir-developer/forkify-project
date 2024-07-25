import { API_BASE_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "../../helpers";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RES_PER_PAGE, //For the computation
    //THE CURRENT PAGE IS A STATE! SINCE IT IS UPDATED ON THE UI
    page: 1,
  },
  bookmarks: [],
};

/**SUPER IMPORTANT -BOOKMARK:
 *  AFTER FETCHING THE RECIPE
 *    CHECK IF IT'S ID WAS PRESENT IN THE BOOKMARKS
 *      IF IT IS - THEN SET THE LOADED RECIPE AS BOOKMARKED!
 *
 *     OTHERWISE - THE BOOKMAKRED STATE WILL NOT BE PRESERVED
 */
export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_BASE_URL}recipes/${id}`);

    let { recipe } = data.data;

    //CONVERT API FIELDS
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    //Must check if the recipe was marked as bookmarked
    // on a previous load of this recipe(if there was such) - Implemented in the addBookmark() method
    //AND RE-MARKED THE CURRENT LOADED RECIPE!!

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    ///UPDATE THE STATE

    // state.recipe = recipe;
  } catch (err) {
    console.error(`${err} *** (MODEL)`);
    //RE-THROW!! TO MARK THIS PROMISE AS REJECTED -TO PROPAPAGE TO THE CONTROLLER
    //OTHERWISE WILL NOT PROPAGATE TO CONTROLLER - SINCE "HANDLED"
    throw err;
  }
};

//http://localhost:3000/api/v1/recipes?search="PizzA"
export const loadSearchResults = async (query) => {
  try {
    //update the query state- for analatyics
    state.query = query;

    //USE POPCORN - DONT SENT API REQUESTS FOR QUERY < 3
    const data = await getJSON(`${API_BASE_URL}recipes?search=${query}`);

    if (data.status === "fail") throw data;

    if (data.results === 0)
      throw new Error(`No recipe found for ${query}, please try another one`);

    // const { recipes } = data.data;

    //2.RENAME API's PROPERTIES NAMES
    const recipes = data.data.recipes.map((rec) => {
      return {
        publisher: rec.publisher,
        imageUrl: rec.image_url,
        title: rec.title,
        id: rec.id,
      };
    });

    //UPDATE THE STATE!
    //IMPORTANT:MUST RESET THE PAGE TO 1 1!!(ALSO THE CURRENT PAGE!! SINCE OTHERWISE FOR NEW SEARCH - THE PREVIOUS PAGE WILL BE PRESERVED)
    state.search.results = recipes;
    state.search.page = 1;

    // console.log("MODEL- AFTER CONVERTING PREVIEWS FROM API TO CLIENT NAMING: ");
    // console.log(state.search.results);

    // console.log(
    //   "Model inside loadSearchResults: Update state after success fetched : "
    // );
    // console.log(state);
  } catch (err) {
    console.error(`Model loadSearchResults error: ${err.message}`);
  }
};

//page = 1,2,,,,
//slice(0,10) //extract the 10!)
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;

  // console.log(`start = ${start}, end = ${end}`);

  // const results = state.search.results.slice(start, end);
  // console.log(results);
  return state.search.results.slice(start, end);
};

// const getNewQuantity = (oldQuantity, oldServings, newServings) =>
//   (oldQuantity * newServings) / oldServings;

//newQuantity = (quantity * newServings) / servings
export const updateServings = (newServings) => {
  //1.Update the servings state to newServings
  //console.log(`model: before update: ${state.recipe.servings}`);

  // state.recipe.servings = newServings;

  // console.log(`model: statue before update servings and quantities:`);
  // console.log(state.recipe);
  // const oldServings = state.recipe.servings;

  //JONAS
  //SIDE EFFECT! MUTATE THE ARRAY - TRY BELOW IMMUTABLE
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

/**BOOKMARKS FUNCTIONALITY :
 * -  Bookmark vs unbookmkarked :
 *
 *     ADD Bookmark : takes a recipe object a recipe is "bookmarked recipe "  iff  recipe id === state.recipe.id
 *      PATTERN - FOR ADDING TAKES AN OBJECT
 *
 *      Unbookmark: takes an id(simpler)
 *        USE MUTABLE for now : slice
 *        LATER - TRY WITH IMMUTABLE - WITH FILTER- for the filter to update the bookmakrs - filter out
 *
 *
 *
 *
 */

//PERSIST BOOKMARKS ARRAY STATE(BY FIRST STRINGIFY IT )
const persistBookmark = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

/**
 * NOTES:
 *  - The recipe should be added to the bookmarks state - anyway
 * -  The recipe should be marked as bookmarked - ONLY IF THE recipe.id === state.recipe.id !
 *        1.SINCE SO WHEN THE USER BOOKMARKS CURRENT RECIPE -
 *        2.THEN USER  SELECT ANOTHER RECIPE
 *        3.API FETCH NEW RECIPE AND THEN SELECT THE RECIPE HE ALREADY BOOKMARKED - THEN ITHEN THE API FETCH - AND  FOR A NEW RECIPE)
 *        4. THEN USER SELECT THE PREVIOUS RECIPE(BOOKMARKED)
 *        5. API FETCH THE PREVIOUS RECIPE - BUT WITHOUT MARKING IT ON THE PREVIOUS LOAD AS BOOKMARKED -
 *                 IT WILL NOT BE MARKED ON THE UI AS BOOKMAKRED
 *        6.Then when the loadRecipe() - updates the recipe state - it will set it as such!
 *
 */
export const addBookmark = (recipe) => {
  //ADD BOOKMARK
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmark();

  //WRONG!!!!  HE ADDED THE BOOKMARK WITHOUT CONDITION
  //UPDATE STATE IF NEEDED
  // if (state.recipe.id === recipe.id) {
  //   state.bookmarks.push(recipe);
  //   state.recipe.bookmarked = true;
  // }
};

export const deleteBookmark = (id) => {
  //NOT CLEAN FOR NOW(using splice!!)
  const index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  //MARK THE CURRENT RECIPE AS NOT BOOKMAKRED ANYMORE(since user clicks the bookmark button on it's view to unbookmark)
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmark();

  //CHECK IF IT WORKS !!!!
  // state.bookmarks.filter((bookmark) => bookmark.id !== recipe.id);
  // state.recipe.bookmarked = false;
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

//FOR DUBGGINGG - ONLY DURING DEVELOPMENT!
const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};

//FOR DEVELOPMENT PURPOSE ONLY
//clearBookmarks();

//////////////////////////////////////////////
//LATER IMMUTABLE
// const init = function () {
//   //DONT STORE DIRECTLRY - SINCE MIGHT BE UNDEFIFNED - AND I WANT [] BY DEFAULT IF NO BOOKMARKS IN L.S
//   const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));

//   console.log("INSIDE INIT - BOOKMARKS BEFORE READING ROM L.S");
//   console.log(state.bookmarks);
//   storedBookmarks ? (state.bookmarks = storedBookmarks) : [];

//   console.log("INSIDE INIT - BOOKMARKS AFTER READING ROM L.S");
//   console.log(state.bookmarks);
// };

// init();
// const getNewQuantity = (oldQuantity, oldServings, newServings) =>
//   (oldQuantity * newServings) / oldServings;

// updateServings(10);
//TEST - API PERFECT!!
// loadSearchResults("PizZa");

// state.recipe.ingredients.forEach((ing) => {
//   ing.quantity = getNewQuantity(
//     ing.quantity,
//     state.recipe.servings,
//     newServings
//   );

//   state.recipe.servings = newServings;
// });

//IMMUTABLE!!!!!!!!!!!!!!!!!!!!!!
//TRY TO IMPLEMENT WITH IMMUTABLE
// const newIngredients = state.recipe.ingredients.map(
//   ((ing) => ing.quantity * state.recipe.servings) / newServings
// );

// console.log(newIngredients);
// state.recipe = {
//   ...state.recipe,
//   ingredients: newIngredients,
//   servings: newServings,
// };
