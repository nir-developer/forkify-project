import icons from 'url:../../img/icons.svg' //PARCEL 2: FOR ANY ASSET WHICH IS NOT A PROGRAMMING FILE(IMAGES, ICONS, VIDEO,,)

//NO INSTANCE IS CREATED BY THIS CLASS!(ABSTRACT CALSS - WITH SOME COMMON IMPLEMENTATIONS)
export default class View{

    _data 

    render(data)
    {

      //GOURD CLAUSE: Handle undefined data or empty array data by rendering error message 
      if(!data || (Array.isArray(data) && data.length === 0))
        return this.renderError()
      
    
        // this.renderError(this._errorMessage)
        
        this._data = data; 
        const markup = this._generateMarkup(); 
        this._clear(); 
        this._parentElement.insertAdjacentHTML('afterbegin', markup)   
     }

     renderSpinner ()
    {
      const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> ` 


        this._clear();
        //AT RUN TIME - this will have the specific _parentElement which is not a class field on this base class!
        this._parentElement.insertAdjacentHTML('afterbegin', markup) 
     }

    //AT RUN TIME - this will have the specific _errorMessage which is not a class field on this base class!
   renderError(message = this._errorMessage)
  {
    this._clear(); 
    const markup = `
          <div class="error">
            <div>
            
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `
  //AT RUN TIME - this will have the specific _parentElement which is not a class field on this base class!
  this._parentElement.insertAdjacentHTML('afterbegin', markup)

  }

  renderMessage(message = this._message){

    const markup = `
     <div class="message">
              <div>
              <h2>RECIPE VIEW</h2>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                      </svg>
                    </div>
                    <p>
                      ${message}
                    </p>
                  </div>
                  `

              this._clear(); 
                //AT RUN TIME - this will have the specific _parentElement which is not a class field on this base class!
              this._parentElement.insertAdjacentHTML('afterbegin', markup)


  }
    //PRIVATE METHODS
    _clear()
    {
        //AT RUN TIME - this will have the specific _parentElement which is not a class field on this base class!
        this._parentElement.innerHTML = ''
    }

     
}

