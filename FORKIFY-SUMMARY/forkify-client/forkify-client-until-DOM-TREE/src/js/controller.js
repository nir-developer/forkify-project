
'use strict'

import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
 

//POLYFILLING ASYNC AWAIT + ANY THING ELSE - FOR OLD BROWSERS
import 'regenerator-runtime/runtime' 
import 'core-js/stable'; 


///PARCEL HOT RELOAD REPLACEMENT 
if(module.hot) module.hot.accept()


const controlRecipes = async() =>{
   
  try    
    {
       //0)Routing(application logic - implementing here in the controller):Fetch the 
       const id = window.location.hash.slice(1)
    
       //GOURD 
       if(!id) return ;

        //1)LOAD SPINNER - UI LOGIC - IMPLEMENTED IN THE VIEW
        recipeView.renderSpinner();
    
     
        //2) LOAD RECIPE(HTTP LIBRARY COMPONENT - IMPLEMENTED IN THE MODEL)
        await model.loadRecipe(id)

      
   
        //3) RENDER RECIPE
        recipeView.render(model.state.recipe)

        
        //TEST: BEFORE BINDING THE controlUpdateServings to the RecipeView ! 
        //manually call  it here in this handler -   since state must have a recipe data before! 
        // const oldServings = model.state.recipe.servings;
        controlUpdateServings(8);

  }
    catch(err)
    {

      console.log(err)
       //delegate Error Handling(real world handling - by render) to view 
       //BETTER TO LET THE VIEW DEFINE THE MESSAGE IT WANTS TO DISPLAY(instead of passing it the message from the controller)
        recipeView.renderError()
      
    }
}

const controlSearchResults = async (query) =>{

  try 
  {
    //0) Render the spinner 
    resultsView.renderSpinner()
    //1)Get the search input from the SearchView 
    const query = searchView.getQuery()
    if(!query) return ; 

    //2)LOAD THE RECIPES USING THE MODEL (the model does not return anything- it should only manipulate the state)
    await model.loadSearchResults(query)

    
    //3)GET ALL THE RESULTS FROM THE MODEL STATE AND RENDER (BEFORE ADDING THE PAGINATION)
    //resultsView.render(model.state.search.results)

   //WITH PAGINATION(I set default value for the page to 1 -> if not pass the arg below)
     resultsView.render(model.getSearchResultsPage()) 

    //4)Render the pagination view by passing it's data as the entire search state(since it needs the results, page, and resultsPerPage
     paginationView.render(model.state.search); 
     
    //  console.log('----')
    //  console.log(model.state)

  }

 
catch(err)
{
  console.log('controller controlSearchResults catched errror')
  console.log(err)
  throw err;

}
}

//KEEP THIS CONTROLLER THIN - DONT UPDATE THE SERVINGS VALUE HERE
 //BUT INT THE VIEW WHICH IS THE CORRECT PLACE - SINCE THE USER UPDATE THE SERVINGS THERE 
 //THE CONTROLLER WILL BE MORE FLEXIBLE 
 //THE VIEW WILL PASS THE UPDATED SERVINGS VALUE TO THE  THIS HANDLER CONTROLLER CB
function controlUpdateServings(newServings)
{

 
  //UPDATE THE RECIPE SERVINGS (IN STATE)
  model.updateServings(newServings) ;

  console.log('HI FROM CONTROLLER')

  //RENDER THE RECIPE VIEW WITH THE UPDATED servings and the updated quantities 
  recipeView.render(model.state.recipe)





 


}


//NOTE: the goToPage value is passed BY THE VIEW - WHICH IS STORED ON THE HTML - DATASET!!!
function controlPagination(goToPage)
{


  //RENDER NEW RESULTS 
  //1)Update the state of the page 
  //2)Fetch the requested page 
  //3)Get the updated state of the search and render the SearchResultsView and the PaginationView with new results and buttons respectively 
  //4)Render the NEW RESULTS search results and the updated pagination buttons
  //NOTE - NO LOADING! THE MODEL HAS ALL THE RESULTS OF THE SEARCH IN IT'S STATE!
  resultsView.render(model.getSearchResultsPage(goToPage))

  //RENDER NEW PAGIANTION BUTTONS
  paginationView.render(model.state.search)



}


function init()
{
  //SUBSCRIBE controlRecipes ON LOAD/HASHCHANGE EVENTS(ON PAGE LOAD - app start!)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlUpdateServings)
  //searchView view(in the static header - does not render anything!) 

  searchView.addHandlerSearch(controlSearchResults)

  paginationView.addHandlerClick(controlPagination)
  

}

init();



//LISTEN TO THE LOAD  AND HASHCHANGE EVENTS - REFACTORED THISLOGIC TO THE VIEW!
//['hashchange', 'load'].forEach(e => window.addEventListener(e, recipeController))
// window.addEventListener('hashchange', recipeController);
// window.addEventListener('load', recipeController)



//SIMPL TEST TO MY API WITH THE CORS I ADDED TO IT:
// fetch('http://localhost:3000/forkify/api/v1/recipes') 
// .then(response => {
//   console.log(response)

//   return response.json(); 
// })
// .then(data => {
//   console.log(data)

// })
// .catch(err => console.log(err.name))

/**
 * 
 */