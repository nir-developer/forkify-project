import { getJSON } from "./helpers.js";

//WITH HIS API :
import { API_URL,MY_API_URL, RES_PER_PAGE } from "./config";



export const state = {
    recipe:{}, 
    search:{
        query:'',
        results:[], 
        page :1, 
        resultsPerPage: RES_PER_PAGE
    }
}


export const loadRecipe = async (id)=>
{
    try 
    {
        //1) LOAD THE RECIPE FROM THE API
        //IF getJSON throws - then all code after this call will skip to catch below!
        //const data = await getJSON( `${API_URL}${id}`)
        
        //MY API
        const data = await getJSON( `${API_URL}${id}`)

        

        //2) RENAME API's NAME PROPERTIES
        let {recipe} = data.data;
        recipe = {
            //MY API WITH _id 
            //id:recipe._id,
            id:recipe.id, 
            title:recipe.title ,
            publisher:recipe.publisher, 
            source:recipe.source_url, //CHANGED
            image:recipe.image_url, //CHANGED
            servings:recipe.servings, 
            cookingTime:recipe.cooking_time, //CHANGED
            ingredients:recipe.ingredients
        }

        //3)UPDATE THE STATE
        state.recipe = recipe; 
    }


    catch(err)
    {
        //WRONG PLACE OF HANDLING "REAL WORLD ERROR HANDLING" BY RENDERING ON THE UI
        //ERROR HANDLING SHOULD BE MOVE BE IN THE VIEW LOGIC!
        // alert(err)
         console.error(`*Model: ERROR*: $${err}`)
        throw err

    }
    
}


export const loadSearchResults = async query =>{

    try 
    {
        //0.UPDATE THE STATE: set the query 
        state.search.query = query; 

        console.log(query)


        
        //1.FETCH THE RESULTS FROM API: OK
       //const data = await getJSON(`${API_URL}?search=${query}`) 
       //MY API 
        const data = await getJSON(`${API_URL}?search=${query}`) 

        console.log(`MY SEARCH RESULTS:`)
       // console.log(data)
      

       //2.RENAME API's PROPERTIES NAMES 
        const recipes =data.data.recipes.map(rec =>{
            return {
                publisher:rec.publisher, 
                image:rec.image_url,
                title:rec.title, 
                id:rec.id
            }
        })

        console.log(recipes)

       //3.STORE THE RESULTS IN THE STATE 
       state.search.results = recipes

       //console.log(state.search.results)
    
    }
    catch(err)
    {
        console.error(`Model: getSearchResults - catch an error:`, err.message)
        //RETHROW!
        throw err; 
    }
    
}

export  const getSearchResultsPage = function(page = state.search.page)
{
    //UPDATE THE PAGE STATE 
    state.search.page = page; 

    const start = (page - 1) * state.search.resultsPerPage ;
    const end = page * state.search.resultsPerPage 

   
    return state.search.results.slice(start, end)
}



export const updateServings = function(newServings)
{

    console.log('UPDATE SERVINGS IN THE MODEL', newServings)
    //newQt = oldQt * newServings / oldServings // 2 * 8  / 4 = 4 
    state.recipe.ingredients.forEach(ing => {

        //const newQty = (oldQty / oldServings )  * newServings
        const newQty = ing.quantity * newServings / state.recipe.servings
      
        //UPDATE QTY 
        ing.quantity = newQty;
    })

    
   state.recipe.servings = newServings
 

}



//GREAT!! IT RETURNS THE LIST OF ALL PIZZA!!!
// const query = 'Pizza'

// fetch(`${MY_API_URL}?search=${query}`)
// .then(res => {
//     console.log(res)
//     return res.json(); 
// })
// .then(data => {
//     console.log(data)
// })
// .catch(err => console.log(err))

//  console.log(state.recipe.servings)
