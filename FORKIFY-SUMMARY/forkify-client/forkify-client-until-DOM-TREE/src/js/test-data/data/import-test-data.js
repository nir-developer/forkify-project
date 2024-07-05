// import path from 'path'
// import fs from 'fs'
//import {RES_PER_PAGE} from '../../config.js'


// const path = require('path')
// const fs = require('fs')

import path from 'path'
import fs from 'fs'

import { RES_PER_PAGE } from '../../config'


//SELECTED RECIPE STATE
const recipe = {
      "publisher": "Closet Cooking",
      "ingredients": [
        {
          "quantity": 1,
          "unit": "",
          "description": "medium head cauliflower cut into florets"
        },
        {
          "quantity": 1,
          "unit": "",
          "description": "egg"
        },
        {
          "quantity": 0.5,
          "unit": "cup",
          "description": "mozzarella shredded"
        },
        {
          "quantity": 1,
          "unit": "tsp",
          "description": "oregano or italian seasoning blend"
        },
        {
          "quantity": null,
          "unit": "",
          "description": "Salt and pepper to taste"
        },
        {
          "quantity": 1,
          "unit": "cup",
          "description": "chicken cooked and shredded"
        },
        {
          "quantity": 0.5,
          "unit": "cup",
          "description": "barbecue sauce"
        },
        {
          "quantity": 0.75,
          "unit": "cup",
          "description": "mozzarella shredded"
        },
        {
          "quantity": null,
          "unit": "",
          "description": "Red onion to taste thinly sliced"
        },
        {
          "quantity": null,
          "unit": "",
          "description": "Fresh cilantro to taste"
        }
      ],
      "source_url": "http://www.closetcooking.com/2013/02/cauliflower-pizza-crust-with-bbq.html",
      "image_url": "http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg",
      "title": "Cauliflower Pizza Crust (with BBQ Chicken Pizza)",
      "servings": 4,
      "cooking_time": 60,
      "id": "5ed6604591c37cdc054bcc13"
    }
//SEARCH RESULTS STATES
let results = JSON.parse(fs.readFileSync(path.join(__dirname, 'search-results-data.json')))
results = JSON.stringify(results)


//CURRENT APP STATE
 export const state = {
    recipe:recipe,
    search:{
        results, 
        query:'Pizza', 
        page:1
    }
    
}

export const getSearchResultsPage = function(page = state.search.page)
{
    
    const start = (page - 1) * RES_PER_PAGE; 
    const end = page * RES_PER_PAGE; 

    return state.search.results.slice(start,end)

    
}


//GREAT!EXPORT MULTIPLE  WITH CJS - BUT I WILL EXPORT FROM THE FILES WITH ES6 TO BE CONSISTENT 
// module.exports = {state}



const x = getSearchResultsPage(1)
console.log(x)