import icons from 'url:../../img/icons.svg' //PARCEL 2: FOR ANY ASSET WHICH IS NOT A PROGRAMMING FILE(IMAGES, ICONS, VIDEO,,)

import View from "./View";

class ResultsVIew extends View
{
    //UNIQUE PROTECTED CLASS FIELDS OF THIS VIEW (ONLY THIS VIEW KNOWS -  NOT THE VIEW BASE CLASS)
    //the parent is the <ul> element - and each result is the preview <li> element
    _parentElement = document.querySelector('.results')
    _errorMessage = 'No recipe found for your query! Please try again!'
    _message = ''


    _generateMarkup() 
    {
        //results data in this._data is an array  

        return this._data.map(res => this._generateMarkupPreview(res)).join()
        
       
        // const markup = `
        //  <li class="preview">
        //     <a class="preview__link preview__link--active" href="#23456">
        //       <figure class="preview__fig">
        //         <img src="src/img/test-1.jpg" alt="Test" />
        //       </figure>
        //       <div class="preview__data">
        //         <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
        //         <p class="preview__publisher">The Pioneer Woman</p>
        //         <div class="preview__user-generated">
        //           <svg>
        //             <use href="src/img/icons.svg#icon-user"></use>
        //           </svg>
        //         </div>
        //       </div>
        //     </a>
        //   </li>
        // `

        // return markup;

    
    }

    _generateMarkupPreview(result)
    {
        //IMPORTANT!! THE id should be embedded in the href after the # !! For clicking to view recipe details 
        //ASLO REMOVE THE preview__link--active class and the svg icon 'user-generated' -  below - unitl the section of uploading recipe!
        return `
         <li class="preview">
            <a class="preview__link " href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
               
              </div>
            </a>
          </li>
        `
    }



}



export default new ResultsVIew(); 