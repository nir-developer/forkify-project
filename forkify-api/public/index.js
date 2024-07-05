const recipeName = document.querySelector('.recipe__name')
const recipeContainer = document.querySelector('.recipe')
const loadMessage = document.querySelector('.loadMessage')


console.log(recipeName)
const API_BASE_URI=`http://localhost:3000/forkify/api/v1/`

const getAllRecipes = async()  =>
{
    try 
    {
       

        const response = await fetch(`${API_BASE_URI}recipes`)

        const data= await response.json()

        
        const {recipes} = data.data;

        console.log(recipes)
    }
    catch(err)
    {
        alert(err.message)
    }
}


const renderRecipe = (recipe)  =>
{
    //CLEAR CONTAINER 
    recipeContainer.innerHTML = ''

    //INSERT NEW DATA
     const markup =  `<h2 class="recipe__name">${recipe.title}</h2>`
    recipeContainer.insertAdjacentHTML('afterbegin', markup)

}

const loadRecipe = async (id)  =>
{

    try 
    {
         //START THE LOAD MESSAGE
        loadMessage.innerHTML = 'LOAD RECIPE...'

        const id = window.location.hash.slice(1); 
        console.log(`loadRecipe - id in hash: ${id}`)
        const response = await fetch(`${API_BASE_URI}recipes/${id}`)
        console.log(response)

        const data = await response.json(response)
        const  {recipe} = data.data; 
        console.log(recipe) ; 

    
        //CLEAR THE LOAD MESSAGE
        loadMessage.innerHTML = ''
        //RENDER title of recipe 
        renderRecipe(recipe)
       
        

    }
    catch(err)
    {
        alert(err.message)
    }
}



/////////////////////////////////
//TESTS
//1) GET ALL RECIPES - OK !!
//getAllRecipes(); 


//2 loadRecipe - by id 



['hashchange', 'load'].forEach(e => window.addEventListener(e, loadRecipe))
