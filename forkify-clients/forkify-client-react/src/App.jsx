// src/App.jsx
// src/App.jsx
import "./styles/main.scss"; // Adjust the path according to your project structure

import React from "react";

const App = () => {
  return (
    <div className="container">
      <Header className="header" />
      <SearchResults />
      <Recipe />
      {/* <UploadRecipe /> */}
    </div>
  );
};

function Header() {
  return (
    <header className="header">
      <Logo />
      <Search />
      <Nav />
    </header>
  );
}

function Logo() {
  return <img src="logo.png" alt="Logo" className="header__logo" />;
}

function Search() {
  return (
    <form className="search">
      <input
        type="text"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
        value=""
      />
      <button className="btn search__btn">
        <svg className="search__icon">
          <use href="icons.svg#icon-search"></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <>
          <NavItem>
            <NavBtnAddRecipe />
          </NavItem>
          <NavItem>
            <NavBtnBookmarks />
          </NavItem>
        </>
      </ul>
    </nav>
  );
}

function NavItem({ children }) {
  return <li className="nav__item">{children}</li>;
}

function NavBtnAddRecipe() {
  return (
    <button className="nav__btn nav__btn--add-recipe">
      <svg className="nav__icon">
        <use href="icons.svg#icon-edit"></use>
      </svg>
      <span>Add recipe</span>
    </button>
  );
}

function NavBtnBookmarks() {
  return (
    <button class="nav__btn nav__btn--bookmarks">
      <svg class="nav__icon">
        <use href="./img/icons.svg#icon-bookmark"></use>
      </svg>
      <span>Bookmarks</span>
    </button>
  );
}

function SearchResults() {
  return (
    <div class="search-results">
      <Results />
      <Pagination />
      <CopyRight />
    </div>
  );
}

function Results() {
  return (
    <ul class="results">
      <Preview />
    </ul>
  );
}
function Preview() {
  return (
    <li class="preview">
      <a class="preview__link preview__link--active" href="#23456">
        <figure class="preview__fig">
          <img src="src/img/test-1.jpg" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
          <p class="preview__publisher">The Pioneer Woman</p>
          <div class="preview__user-generated">
            <svg>
              <use href="sr.svg#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
  );
}

function CopyRight() {
  return (
    <p className="copyright">
      &copy; Copyright by
      <a
        className="twitter-link"
        target="_blank"
        href="https://twitter.com/jonasschmedtman"
      >
        Jonas Schmedtmann
      </a>
      . Use for learning or your portfolio. Don't use to teach. Don't claim as
      your own.
    </p>
  );
}

function Recipe() {
  return <Message />;
  // return (
  //   <div class="recipe">
  //     {/* <Spinner /> */}
  //     {/* <Error /> */}

  //     <figure className="recipe__fig">
  //       <img src="src/img/test-1.jpg" alt="Tomato" className="recipe__img" />
  //       <h1 className="recipe__title">
  //         <span>Pasta with tomato cream sauce</span>
  //       </h1>
  //     </figure>

  //     <div className="recipe__details">
  //       <div className="recipe__info">
  //         <svg className="recipe__info-icon">
  //           {/* <use href="sr.svg#icon-clock"></use> */}
  //           <use href="icons.svg#icon-clock"></use>
  //         </svg>
  //         <span className="recipe__info-data recipe__info-data--minutes">
  //           45
  //         </span>
  //         <span className="recipe__info-text">minutes</span>
  //       </div>
  //       <div className="recipe__info">
  //         <svg className="recipe__info-icon">
  //           <use href="icons.svg#icon-users"></use>
  //         </svg>
  //         <span className="recipe__info-data recipe__info-data--people">4</span>
  //         <span className="recipe__info-text">servings</span>

  //         <div className="recipe__info-buttons">
  //           <button className="btn--tiny btn--increase-servings">
  //             <svg>
  //               <use href="icons.svg#icon-minus-circle"></use>
  //             </svg>
  //           </button>
  //           <button className="btn--tiny btn--increase-servings">
  //             <svg>
  //               <use href="icons.svg#icon-plus-circle"></use>
  //             </svg>
  //           </button>
  //         </div>
  //       </div>

  //       <div className="recipe__user-generated">
  //         <svg>
  //           <use href="icons.svg#icon-user"></use>
  //         </svg>
  //       </div>
  //       <button className="btn--round">
  //         <svg className="">
  //           <use href="icons.svg#icon-bookmark-fill"></use>
  //         </svg>
  //       </button>
  //     </div>

  //     <div className="recipe__ingredients">
  //       <h2 className="heading--2">Recipe ingredients</h2>
  //       <ul className="recipe__ingredient-list">
  //         <li className="recipe__ingredient">
  //           <svg className="recipe__icon">
  //             <use href="icons.svg#icon-check"></use>
  //           </svg>
  //           <div className="recipe__quantity">1000</div>
  //           <div className="recipe__description">
  //             <span className="recipe__unit">g</span>
  //             pasta
  //           </div>
  //         </li>

  //         <li className="recipe__ingredient">
  //           <svg className="recipe__icon">
  //             <use href="icons.svg#icon-check"></use>
  //           </svg>
  //           <div className="recipe__quantity">0.5</div>
  //           <div className="recipe__description">
  //             <span className="recipe__unit">cup</span>
  //             ricotta cheese
  //           </div>
  //         </li>
  //       </ul>
  //     </div>

  //     <div className="recipe__directions">
  //       <h2 className="heading--2">How to cook it</h2>
  //       <p className="recipe__directions-text">
  //         This recipe was carefully designed and tested by
  //         <span className="recipe__publisher">The Pioneer Woman</span>. Please
  //         check out directions at their website.
  //       </p>
  //       <a
  //         className="btn--small recipe__btn"
  //         href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
  //         target="_blank"
  //       >
  //         <span>Directions</span>
  //         <svg class="search__icon">
  //           <use href="icons.svg#icon-arrow-right"></use>
  //         </svg>
  //       </a>
  //     </div>
  //   </div>
  // );
}

function Message() {
  return (
    <div class="message">
      <div>
        <svg>
          <use href="icons.svg#icon-smile"></use>
        </svg>
      </div>
      <p>Start by searching for a recipe or an ingredient. Have fun!</p>
    </div>
  );
}

function Spinner() {
  return (
    <div class="spinner">
      <svg>
        <use href="icons.svg#icon-loader"></use>
      </svg>
    </div>
  );
}

function Error() {
  return (
    <div class="error">
      <div>
        <svg>
          <use href="icons.svg#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>No recipes found for your query. Please try again!</p>
    </div>
  );
}
function Bookmarks() {
  //return <></>;
  return (
    <div className="bookmarks">
      <ul className="bookmarks__list">
        <div className="message">
          <div>
            <svg>
              <use href="icons.svg#icon-smile"></use>
            </svg>
          </div>
          <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
        </div>

        <li className="preview">
          <a className="preview__link" href="#23456">
            <figure className="preview__fig">
              <img src="src/img/test-1.jpg" alt="Test" />
            </figure>
            <div className="preview__data">
              <h4 className="preview__name">Pasta with Tomato Cream ...</h4>
              <p className="preview__publisher">The Pioneer Woman</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}

function Pagination() {
  return <></>;
  // return (
  //   <div class="pagination">
  //     <button class="btn--inline pagination__btn--prev">
  //       <svg class="search__icon">
  //         <use href="sr.svg#icon-arrow-left"></use>
  //       </svg>
  //       <span>Page 1</span>
  //     </button>
  //     <button class="btn--inline pagination__btn--next">
  //       <span>Page 3</span>
  //       <svg class="search__icon">
  //         <use href="sr.svg#icon-arrow-right"></use>
  //       </svg>
  //     </button>
  //   </div>
  // );
}

function UploadRecipe() {
  return (
    <>
      <div className="overlay"></div>
      <div className="add-recipe-window">
        <button className="btn--close-modal">&times;</button>
        <form className="upload">
          <div className="upload__column">
            <h3 className="upload__heading">Recipe data</h3>
            <label>Title</label>
            <input value="TEST" required name="title" type="text" />
            <label>URL</label>
            <input value="TEST" required name="sourceUrl" type="text" />
            <label>Image URL</label>
            <input value="TEST" required name="image" type="text" />
            <label>Publisher</label>
            <input value="TEST" required name="publisher" type="text" />
            <label>Prep time</label>
            <input value="23" required name="cookingTime" type="number" />
            <label>Servings</label>
            <input value="23" required name="servings" type="number" />
          </div>

          <div className="upload__column">
            <h3 className="upload__heading">Ingredients</h3>
            <label>Ingredient 1</label>
            <input
              value="0.5,kg,Rice"
              type="text"
              required
              name="ingredient-1"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 2</label>
            <input
              value="1,,Avocado"
              type="text"
              name="ingredient-2"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 3</label>
            <input
              value=",,salt"
              type="text"
              name="ingredient-3"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 4</label>
            <input
              type="text"
              name="ingredient-4"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 5</label>
            <input
              type="text"
              name="ingredient-5"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 6</label>
            <input
              type="text"
              name="ingredient-6"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
          </div>

          <button className="btn upload__btn">
            <svg>
              <use href="icons.svg#icon-upload-cloud"></use>
            </svg>
            <span>Upload</span>
          </button>
        </form>
      </div>
    </>
  );
}
export default App;
