const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const fs = require('fs')
const path = require('path')
const  mongoose = require('mongoose')

const Recipe = require('../../models/Recipe')

// CONNECT TO DB  - TOP LEVEL!
const DB = process.env.DB_ATLAS;
mongoose
.connect(DB) 
.then(() => console.log(`DB connection successful!`))
.catch(err => console.log(err.message))

const importData = async (data) =>
{
    try 
    {
        const recipes = await Recipe.create(data)
        console.log(`ADDING ${recipes.length} RECIPES DOCUMENTS FROM JSON FILE TO DB SUCCESS!`)
    }
    catch(err)
    {
        console.log(err.message)
    }

    process.exit()
    
}


//DELETE ALL TOUR DOCUMENTS FROM THE TOURS COLLECTION IN DB
const deleteData =async () => {
    try 
    {
        //LIKE IN MONGODB - MONGOOSE HAS THIS FUNCTION TO DELETE ALL DOCUMENTS! - deleteMany(with no param) 
        await Recipe.deleteMany(); 
        console.log(`ALL RECIPES DELETED FROM THE RECIPES COLLECTION IN DB: `)
    }
    catch(err)
    {
        console.log(err.message)
    }
        //HARD TERMINATION - THAT FINE SINCE I RUN ONLY THIS SCRIPT - NOT THE APP..
    process.exit();
}
 



const recipes = JSON.parse(fs.readFileSync(path.join(__dirname, 'recipes.json'))); 

 //CHECK COMMAND LINE THIRD ARG 
if(process.argv[2] === '--import') importData(recipes) 

else if(process.argv[2] === '--delete') deleteData(); 
// importData(recipes)

//deleteData();



