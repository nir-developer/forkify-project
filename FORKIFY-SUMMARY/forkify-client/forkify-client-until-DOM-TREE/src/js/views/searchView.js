//THIS VIEW DOES NOT RENDER - INSTEAD IT SHOULD RETURNS THE VALUE OF THE SEARCH INPUT
//SELECT THE 'search' element(the form itself) as the parent that has the button and the input elemetns - not the search__input

class SearchView{
_parentEl = document.querySelector('.search')

//PUBLIC API 
//Subscription function for the controller subscriber to subscribe
addHandlerSearch(handler)
{
    this._parentEl.addEventListener('submit', function(e){
    e.preventDefault()
    //THE HANDLER CONTROLLER(controlSearchResults) WILL CALL THE getQuery() of this view to get the query word and then clear the input
    handler();

    })
}

getQuery()
{

    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
}


_clearInput()
{
    this._parentEl.querySelector('.search__field').value = ''
}



}


export default new SearchView();