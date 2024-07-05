import { TIMEOUT_SEC } from "./config"

const timeout = function(s)
{
    return new Promise(function(_, reject) {
        setTimeout(function(){
            //NOTE!!! THIS IS A SIDE EFFECT! I SHOULD NOT PRINT - SINCE IT WILL ALWAYS PRINT REGARDLESS!!
            //console.log('INSIDE TIMEOUT')
             reject(new Error(`Request took too long! Timeout after ${s} seconds!`))
        }, s * 1000)
    });
};

export const getJSON = async url => {
    try 
    {
         const fetchPro = fetch(url); 
         
         const res = await  Promise.race([fetchPro, timeout(TIMEOUT_SEC)]) 

         const data =await res.json(); 
         if(!res.ok) throw new Error(`${data.message} (${res.status})`)

         return data; 
    }
    catch(err)
    {
        //DONT HANDLE IT HERE(dont log it here!-instead - re-throw the error to the caller)
        // console.error(`*HELPERS: getJSON -ERROR*: $${err}`)
        //RETHROW !!! THIS WILL MAKE THE PROMISE RETURNS FROM getJSON() to be a rejected promise!! 
        //this is what I want!otherwise - the catch block in the model will not be executed - since 
        //the promise returned from getJSON() consider as resolved! 
        throw err; 
    }
         
}