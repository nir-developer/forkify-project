import View from "./View";
import previewView from "./previewView";
class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
  _message = "";

  /*
    IMPORTANT: The render() !!!!!!
      1) WHy calling the render method (and not previewView._generateMarkup - since the render set the _data property 
         to the preview parameter (_generateMarkup doe not!))
         and the _generateMarkup of PreviewView (called by render of PrevviewView ) - uses the this keyword! 
         WHICH REFERS TO THE instance of the PreviewView (in _generateMarkup of PreviewVview - this._data : this is the current PrevviewView  )
         the this of PreviewView refers to either a Recipe object or Bookmark object 
      2) Why passing the false as a second arg? Since I need to RETURN the markup and not RENDER it!

      3) this exact _generateMarkup() method should be in the ResultsView

   */
  _generateMarkup() {
    const markup = this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");

    return markup;
  }

  /**SUPER IMPORTANT NOTES: 
   * 
   *    1) THIS METHOD WAS CREATE AS  THE SOLUTION FOR THE BUG ON THE UPDATE() METHOD WHEN IMPLENETING LOADING BOOKMARKS FROM L.S IN THE MODEL 
   * 
        2) THE FLOWCHART SECTION!!!!!!!!!!!!! FLOW CHART!!!
        FLOWCHART PART IMPLEMENTED:BIND THE HANDLER!!!! THE controlBookmarks!!
        PAGE LOADS => Bookmarks are  loaded from L.S  into the state() (by the model right away ) 
        //NOTE - the init method of the model is called before the render method 
         and state is updatedUSER CLICKS ON A RECIPE => THE HASH CHANGED - THEN THE - THEN THIS addRenderHandler  IS CALLED(listen to hash) - then the bounded controlBookmarks subscriber is triggered - and calls the render() method of BookmarksView to render!!)
   * 
  */
  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  //BEFORE REFACTORING - BY EXTRACTING THE _generatePreviewMarkup to new Child view PreviewView
  //   _generateMarkup() {
  //     const markup = this._data.map(this._generateMarkupPreview).join("");

  //     return markup;
  //   }

  ///USE THE PreviewView a child view - to generate (not render) the markup of the preview
  //   _generateMarkupPreview(result) {
  //     const id = window.location.hash.slice(1);

  //     return `
  //         <li class="preview">
  //             <a class="preview__link ${
  //               result.id === id ? "preview__link--active" : ""
  //             }" href="#${result.id}">
  //               <figure class="preview__fig">
  //                 <img src="${result.imageUrl}" alt="${result.title}" />
  //               </figure>
  //               <div class="preview__data">
  //                 <h4 class="preview__title">${result.title}</h4>
  //                 <p class="preview__publisher">${result.publisher}</p>
  //                 <div class="preview__user-generated">
  //                   <svg>
  //                     <use href="${icons}#icon-user"></use>
  //                   </svg>
  //                 </div>
  //               </div>
  //             </a>
  //           </li>`;
  //   }
}

// new ResultsView().printInfo();
//SINGLETON!!
export default new BookmarksView();

// export default new ResultsView();
