import icons from "url:../../../public/img/icons.svg";

import View from "./View";
class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  /**EVENT DELEGATION - IMPORTANT!!!!
   *must use the e to figure out which button is the target element of the click)
   for the matching strategy 
 */
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      //   console.log(e.target);
      const btn = e.target.closest(".btn--inline");
      //PREVENT DELEGATION TO PARENTS OF THE BUTTONS!
      // console.log(btn);
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      // console.log(typeof goToPage);
      // console.log(`inside addHandlerClick - goto = ${goToPage}`);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numResults = this._data.results.length;
    const resultsPerPage = this._data.resultsPerPage;
    const currentPage = this._data.page;
    //console.log(numResults, numResultsPerPage);

    const numPages = Math.ceil(numResults / resultsPerPage);

    // console.log(`paginationView,
    // currentPage = ${currentPage},
    // numPages = ${numPages},
    // numResults = ${numResults}`);

    //Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1)
      //return "Page 1, and are other pages";
      return `
        <button class="btn--inline pagination__btn--next" data-goto=
        ${currentPage + 1}>
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
      `;

    // if (currentPage === 1 && currentPage === numPages)
    if (currentPage === numPages && numPages > 1)
      //return "page 1, others";

      //Last Page
      return ` 
            <button class="btn--inline pagination__btn--prev" data-goto=${
              currentPage - 1
            }>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
            </button>
      `;
    //console.log("Page 1, and there are no more pages");

    //Other Page
    if (currentPage < numPages)
      //return "other page";
      return `
         <button class="btn--inline pagination__btn--prev" data-goto=${
           currentPage - 1
         }>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next" data-goto=${
            currentPage + 1
          }>
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;

    //Page 1, and there are no more pages - REUTRN NOTHING!!!
    //return "only 1 page";
    return ` `;
    //console.log("ONLY ONE PAGE");
  }
}

// const x = new PaginationView()._parentElement;
// console.log(x);
export default new PaginationView();

/**
 *  // return `
    //  <button class="btn--inline pagination__btn--prev">
    //         <svg class="search__icon">
    //           <use href="src/img/icons.svg#icon-arrow-left"></use>
    //         </svg>
    //         <span>Page 1</span>
    //       </button>
    //       <button class="btn--inline pagination__btn--next">
    //         <span>Page 3</span>
    //         <svg class="search__icon">
    //           <use href="src/img/icons.svg#icon-arrow-right"></use>
    //         </svg>
    //       </button>
    // `;

 */
