import icons from 'url:../../img/icons.svg' //PARCEL 2: FOR ANY ASSET WHICH IS NOT A PROGRAMMING FILE(IMAGES, ICONS, VIDEO,,)

import View from "./View";

class PaginationView extends View
{
    _parentElement = document.querySelector('.pagination')


    addHandlerClick(handler)
    {
      //EVENT DELEGATION! 
      //Step 1: attach the handler on the closet common parent of the buttons 
      //Step 2: Matching strategy: select the target element that triggered the event and handle it
      //NOTE - I CAN NOT CALL IMMITALLY TO THE HANDLER - 
      //BY PASSING TO THE addEventListener - since I need to know the actual button based on the event.target 
      this._parentElement.addEventListener('click', function(e){
        // console.log(e.target)
        // handler();

        //SELECT THE CLOSET PARENT TO THE EVENT TARGET(SINCE IF THE SPAN OR ICON(BUTTON'S CHILDREN) IS CLICKED BU I WANT THE EVENT TO BUBBLE UP UNTIL THE BUTTON PARENT)
        //SUPER IMPORTANT - WHY I SELECT THE BUTTON?? 
        //SINCE I NEED A WAY OF KNOWING THE PAGE NUMBER NUMBER TO GO WHEN CLICKING THE BUTTON! 
        //BY ESTABLISHING A CONNECTION BETWEEN DOM(HTML) AND  JS CODE ! 
        //USING THE DATA SET ATTRIBUTE - I CAN STORE THE PAGE VALUE TO GO NEXT! 
        //ONLY THE CAN HAVE THIS VALUE! 
        //IMPORTANT - WHEN READING USER DATA FROM AN INPUT ELEMENT - IS DIFFERENT - THE DATA COMES DIRECTLRY FROM THE USER 
        //HERE THE DATA IS NOT AN INPUT DATA COMMING FROM THE USER AS AN INPUT 
        //! I NEED SOMEHOW TO STORE IT 

        const btn = e.target.closest('.btn--inline'); 
        //GOURD CLAUSE ! FOR THE CASE THERE IS NO BUTTON(LIKE THE 4TH CASE BELOW : FIRST PAGE AND NO MORE PAGES 
       //OTHERWISE - NULL POINT EXCEPTION
        if(!btn) return ;
        console.log(btn)
        
        //CONVERT THE STRING VALUE FROM THE DOM TO NUMBER
        const goToPage = +btn.dataset.goto;
        console.log(typeof goToPage)
        console.log(goToPage)

        //FINALLY - PASS THE goToPage to the handler - so it will fetch the requested 
        //page and render it by calling the render of the searchResultsView
        handler(goToPage); 


  
      })

    }



    //IMPORTANT - NOTE THE DATA ATTRIBUTE I ADDED!(Read in summary)
    _generateMarkup()
    {

      const numberOfPages = this._getNumberOfPages();
      const {resultsPerPage,page:currentPage, results } = this._data;

      // console.log(`currentPage: ${currentPage}`)
      // console.log(`numberOfPages = ${numberOfPages}`)
      // console.log(`resultsPerPage: ${resultsPerPage}`)


      //CASE 1: First page and there are more than one pages => Display only Next Button 
      if(currentPage === 1 && numberOfPages > 1)
        return `
          <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next" >
            <span>${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
          </button>`

        //CASE 2:Last page and and there are more than  one pages => Display Only prev button 
        if(currentPage === numberOfPages && numberOfPages > 1)
         return `<button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
            <span>${currentPage - 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
          </button>
        `

        //CASE 3:Page between first page and last page => Display Both buttons 
        //IMPORTANT! FROM CONDITION 1 - I KNOW THAT THE REQUESTED PAGE IS NOT THE FIRST PAGE - OTHERWISE IT WAS RETURNED IN CONDITION 1
        if(currentPage < numberOfPages && numberOfPages > 1) 
           return `
          <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currentPage - 1}</span>
          </button>
          <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
            <span>${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `


      //CASE 4: First page and there are no other pages(fist = last) => Return no buttons!
      //NOTE: Must return something - otherwise - undefined text is rendered on the page
        return ''


    }


    //MY UTIL CLASSES -
    _getNumberOfPages() 
    {
      return Math.ceil( this._data.results.length / this._data.resultsPerPage)
    }
}

export default new PaginationView();
