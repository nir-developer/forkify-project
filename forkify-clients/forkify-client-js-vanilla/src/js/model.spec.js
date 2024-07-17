// //WORKS
// import * as model from "./model.js";
// import { describe, it, expect } from "vitest";
// // import { render, screen } from "@testing-library/vue";
// // import HelloWorld from "./HelloWorld.vue"; // adjust the import based on your file structure

// describe("HelloWorld Component", () => {
//   it("smoke", () => {
//     expect(true).toBe(true);
//   });

// });

/////////////////////////////////////

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  state,
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  updateServings,
} from "./model";
import { getJSON } from "../../helpers";

vi.mock("../../helpers", () => ({
  getJSON: vi.fn(),
}));

describe("Model Module", () => {
  beforeEach(() => {
    state.recipe = {};
    state.search = {
      query: "",
      results: [],
      resultsPerPage: 10,
      page: 1,
    };
  });

  describe("loadRecipe", () => {
    it("should load and update the recipe state", async () => {
      const mockRecipeData = {
        data: {
          recipe: {
            id: "1",
            title: "Test Recipe",
            publisher: "Test Publisher",
            source_url: "http://test.com",
            image_url: "http://test.com/image.jpg",
            servings: 4,
            cooking_time: 30,
            ingredients: [],
          },
        },
      };

      getJSON.mockResolvedValue(mockRecipeData);

      await loadRecipe("1");

      expect(state.recipe).toEqual({
        id: "1",
        title: "Test Recipe",
        publisher: "Test Publisher",
        sourceUrl: "http://test.com",
        imageUrl: "http://test.com/image.jpg",
        servings: 4,
        cookingTime: 30,
        ingredients: [],
      });
    });

    it("should throw an error if fetching recipe fails", async () => {
      getJSON.mockRejectedValue(new Error("Network Error"));

      await expect(loadRecipe("1")).rejects.toThrow("Network Error");
    });
  });

  describe("loadSearchResults", () => {
    it("should load and update the search results state", async () => {
      const mockSearchData = {
        status: "success",
        data: {
          recipes: [
            {
              publisher: "Test Publisher",
              image_url: "http://test.com/image.jpg",
              title: "Test Recipe",
              id: "1",
            },
          ],
        },
      };

      getJSON.mockResolvedValue(mockSearchData);

      await loadSearchResults("Pizza");

      expect(state.search.results).toEqual([
        {
          publisher: "Test Publisher",
          imageUrl: "http://test.com/image.jpg",
          title: "Test Recipe",
          id: "1",
        },
      ]);
    });

    it("should handle no results found", async () => {
      const mockSearchData = {
        status: "success",
        results: 0,
        data: { recipes: [] },
      };

      getJSON.mockResolvedValue(mockSearchData);

      await loadSearchResults("Pizza");

      expect(state.search.results).toEqual([]);
    });
  });

  describe("getSearchResultsPage", () => {
    it("should return paginated search results", () => {
      state.search.results = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
      }));

      const resultsPage1 = getSearchResultsPage(1);
      const resultsPage2 = getSearchResultsPage(2);

      expect(resultsPage1.length).toBe(10);
      expect(resultsPage2.length).toBe(10);
    });
  });

  describe("updateServings", () => {
    it("should update the state.recipe.servings to the new servings value", () => {
      //GIVEN
      const newServings = 10;

      console.log(state);
      //WHEN
      const actual = updateServings(newServings);

      //THEN
      expect(state.recipe.servings).toBe(newServings);

      console.log("AFTER UPDATING SERVINGS");
      console.log(state);

      // const newQuantity = updateServings(10);
      // expect(newQuantity).toBe(4); // (2 * 10) / 5 = 4
    });
  });
});
