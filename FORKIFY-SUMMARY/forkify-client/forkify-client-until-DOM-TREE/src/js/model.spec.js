
import fs from 'fs'
import path from 'path'


import {describe, it, expect, vi, beforeAll, beforeEach} from 'vitest'

// import * as model from './model.js'
import { updateServings } from './model';


describe('updateServings', ()=>{

let state ; 
beforeEach(()=>{

  try 
  {

    const fileLocation = path.join(__dirname, 'test-data', 'data', 'state-test.json')
    
    const fileData=  fs.readFileSync(fileLocation, 'utf-8'); 

    state = JSON.parse(fileData)

   // console.log(state.search);
  }
  catch(err)
  {
    console.log(err)
   throw new Error(err)
  }
})

  

  it('should update the quantities for each ingredient to the correct value for the provided newServings ', ()=>{
    
    //NOTE: the oldServings value is 8 - in the json file 
    const testNewServings = 16
    const currentIngredientsQty = state.recipe.ingredients.map(ing => ing.quantity)
    
    console.log(state.recipe.servings) ;
    console.log(currentIngredientsQty)
    /**
     * 
     * [ 2, 2,  1, 2, 0, 2, 1, 1.5, 0, 0]
     */
    const expectedQts = [4, 4, 2, 4, 0, 4, 3, 0, 0]


    //ACT - UPDATE THE SERVINGS OF THE CURRENT STATE OBJECT
    //updateServings(testNewServings); 
   
    //const actualQts = state.recipe.ingredients

   // console.log(actualQts)

     

     

  })


})