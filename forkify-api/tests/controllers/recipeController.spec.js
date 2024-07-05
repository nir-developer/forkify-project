const AppError = require("../../utils/appError");
const recipeController = require("../../controllers/recipeController");
const Recipe = require("../../models/Recipe");
const httpMocks = require("node-mocks-http");

jest.mock("../../models/Recipe"); // Mock Recipe model

it("TEST", () => {
  expect(true).toBe(true);
});

describe("recipeController", () => {
  describe("getRecipe", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return a recipe if the recipe exists", async () => {
      ///GIVEN
      // Mock recipe data
      const mockRecipe = {
        _id: "60c72b2f9b1e8b001c8b4567",
        title: "Mock Recipe",
        publisher: "Mock Publisher",
        source_url: "http://example.com",
        image_url: "http://example.com/image.jpg",
        servings: 4,
        cooking_time: 30,
        ingredients: [
          {
            quantity: 1,
            unit: "cup",
            description: "Mock Ingredient",
          },
        ],
      };
      // Mock the Recipe.findById to return mock recipe data
      Recipe.findById.mockResolvedValue(mockRecipe);
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/api/v1/recipes/60c72b2f9b1e8b001c8b4567",
        params: {
          id: "60c72b2f9b1e8b001c8b4567",
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn(); // Mocking the next function
      //WHEN
      await recipeController.getRecipe(req, res, next);
      //THEN
      expect(res.statusCode).toBe(200);
      const responseData = res._getJSONData();
      expect(responseData.status).toBe("success");
      expect(responseData.data.recipe).toEqual(mockRecipe);
    });
  });

  it("should return an error if the recipe does not exist", async () => {
    //GIVEN
    const id = "60c72b2f9b1e8b001c8b4567";
    // Mock the Recipe.findById to return null
    Recipe.findById.mockResolvedValue(null);

    const req = httpMocks.createRequest({
      method: "GET",
      url: `/api/v1/recipes/${id}`,
      params: {
        id,
      },
    });

    const res = httpMocks.createResponse();
    const next = jest.fn(); // Mocking the next function

    await recipeController.getRecipe(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect(next.mock.calls[0][0].statusCode).toBe(404);
    ///Could not find a recipe with the given id 60c72b2f9b1e8b001c8b4567
    expect(next.mock.calls[0][0].message).toBe(
      `Could not find a recipe with the given id ${id}`
    );
  });
});
// describe('recipeController', () => {

//   ////////////////////////////////////////////////////////////////
//   /**CREATE RECIPE SUIT :
//    *
//    * Explanation

//       1.Mocking Recipe.create: We use jest.mock('../models/Recipe')
//           to mock the Recipe model's create method. This allows us to control
//            what Recipe.create returns in our tests.

//       2. Creating Mock Requests and Responses: node-mocks-http is used to create mock HTTP request (req) and response (res) objects for testing.

//       3. Assertions: Use Jest's expect assertions to verify the expected behavior of the createRecipe function under different scenarios: successful creation, validation errors, and server errors.
//    */
//   describe('createRecipe', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should create a new recipe', async () => {
//     const mockRecipeData = {
//       title: 'Test Recipe',
//       ingredients: [{ description: 'Ingredient 1' }, { description: 'Ingredient 2' }],
//       publisher: 'Test Publisher',
//       servings: 4,
//       cooking_time: 30,
//       // Add other required fields as needed
//     };

//     const req = httpMocks.createRequest({
//       method: 'POST',
//       url: '/api/v1/recipes',
//       body: mockRecipeData,
//     });

//     const res = httpMocks.createResponse();

//     // Mock Recipe.create to resolve with a mock recipe object
//     const actual = Recipe.create.mockResolvedValue({ _id: 'mockRecipeId', ...mockRecipeData });
//     // console.log('ACTUAL RECIPE CREATE: ')
//     // console.log(actual)

//     await recipeController.createRecipe(req, res);

//     expect(res.statusCode).toBe(201);
//     expect(res._getJSONData().status).toBe('success');
//     expect(res._getJSONData().data.recipe.title).toBe(mockRecipeData.title);
//     // Add more assertions as needed
//   });

//   it('should return an error if required fields are missing', async () => {
//     const mockRecipeData = {
//       // Missing required fields: title, publisher, servings, cooking_time
//       ingredients: [{ quantity: 1, unit: 'cup', description: 'Test Ingredient' }],
//       source_url: 'http://example.com',
//       image_url: 'http://example.com/image.jpg'
//     };

//     const req = httpMocks.createRequest({
//       method: 'POST',
//       url: '/api/v1/recipes',
//       body: mockRecipeData
//     });
//     const res = httpMocks.createResponse();

//     //SUPER IMPORTANT - FOR TESTING IF NEXT HAS BEEN CALLED WITH AppError - SEE BELOW ASSERTIONS!
//     const next = jest.fn();

//     await recipeController.createRecipe(req, res, next);

//     expect(next).toHaveBeenCalledWith(expect.any(AppError));
//     expect(next.mock.calls[0][0].message).toBe('Please provide all required fields');
//     expect(next.mock.calls[0][0].statusCode).toBe(400);
//   });

// });

// describe('getRecipe', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should return a recipe if the recipe exists', async () => {

//     ///GIVEN
//     // Mock recipe data
//     const mockRecipe = {
//       _id: '60c72b2f9b1e8b001c8b4567',
//       title: 'Mock Recipe',
//       publisher: 'Mock Publisher',
//       source_url: 'http://example.com',
//       image_url: 'http://example.com/image.jpg',
//       servings: 4,
//       cooking_time: 30,
//       ingredients: [
//         {
//           quantity: 1,
//           unit: 'cup',
//           description: 'Mock Ingredient'
//         }
//       ]
//     };

//     // Mock the Recipe.findById to return mock recipe data
//     Recipe.findById.mockResolvedValue(mockRecipe);

//     const req = httpMocks.createRequest({
//       method: 'GET',
//       url: '/api/v1/recipes/60c72b2f9b1e8b001c8b4567',
//       params: {
//         id: '60c72b2f9b1e8b001c8b4567'
//       }
//     });
//     const res = httpMocks.createResponse();
//     const next = jest.fn(); // Mocking the next function

//     //WHEN
//     await recipeController.getRecipeById(req, res, next);

//     //THEN
//     expect(res.statusCode).toBe(200);
//     const responseData = res._getJSONData();
//     expect(responseData.status).toBe('success');
//     expect(responseData.data.recipe).toEqual(mockRecipe);
//   });

//   it('should return an error if the recipe does not exist', async () => {
//     // Mock the Recipe.findById to return null
//     Recipe.findById.mockResolvedValue(null);

//     const req = httpMocks.createRequest({
//       method: 'GET',
//       url: '/api/v1/recipes/60c72b2f9b1e8b001c8b4567',
//       params: {
//         id: '60c72b2f9b1e8b001c8b4567'
//       }
//     });

//     const res = httpMocks.createResponse();
//     const next = jest.fn(); // Mocking the next function

//     await recipeController.getRecipeById(req, res, next);

//     expect(next).toHaveBeenCalledWith(expect.any(AppError));
//     expect(next.mock.calls[0][0].statusCode).toBe(404);
//     expect(next.mock.calls[0][0].message).toBe('No recipe found with that ID');
//   });
// });

//   it('should handle invalid MongoDB ID cast error', async () => {
//     const invalidId = '5c88fa8cf4afda39709c29sss';
//     const castError = new Error('Cast to ObjectId failed');
//     castError.name = 'CastError';

//     Recipe.findById.mockImplementationOnce(() => {
//       throw castError;
//     });

//     const req = httpMocks.createRequest({
//       method: 'GET',
//       url: `/api/v1/recipes/${invalidId}`,
//       params: {
//         id: invalidId
//       }
//     });
//     const res = httpMocks.createResponse();
//     const next = jest.fn();

//     await recipeController.getRecipeById(req, res, next);

//     expect(next).toHaveBeenCalled();
//     const error = next.mock.calls[0][0];
//     expect(error).toBeInstanceOf(AppError);
//     expect(error.statusCode).toBe(400);
//     expect(error.message).toBe('Invalid ID');
//   });

//   afterEach(() => {
//     jest.clearAllMocks(); // Clear mock calls after each test
//   });

//    describe('getAllRecipes', () => {

//    it('should get all recipes', async () => {
//   const mockRecipes = [{ title: 'Recipe 1' }, { title: 'Recipe 2' }];
//   Recipe.find.mockResolvedValue(mockRecipes);

//   const req = httpMocks.createRequest();
//   const res = httpMocks.createResponse();

//   await recipeController.getAllRecipes(req, res);

//   // Ensure the response status code is 200
//   expect(res.statusCode).toBe(200);

//   // Ensure the response data matches the mocked recipes
//   expect(res._getJSONData().data.recipes).toEqual(mockRecipes);
// });

//     it('should handle errors when getting all recipes', async () => {
//       const errorMessage = 'Database errors';
//       //Recipe.find.mockRejectedValue(new Error(errorMessage));
//       Recipe.find.mockRejectedValue(new AppError(errorMessage))

//       const req = httpMocks.createRequest();
//       const res = httpMocks.createResponse();

//       await recipeController.getAllRecipes(req, res);

//       expect(res.statusCode).toBe(500);
//       expect(res._getJSONData().message).toBe(errorMessage);
//     });
//   });

//   //PERFECT!
//   describe('getRecipeById', () => {
//     it('should get a recipe by ID', async () => {
//       const mockRecipe = { _id: 'mockId', title: 'Mock Recipe' };
//       Recipe.findById.mockResolvedValue(mockRecipe);

//       const req = httpMocks.createRequest({
//         params: {
//           id: 'mockId'
//         }
//       });
//       const res = httpMocks.createResponse();

//       await recipeController.getRecipeById(req, res);

//       expect(res.statusCode).toBe(200);
//       expect(res._getJSONData().data.recipe).toEqual(mockRecipe);
//     });

//     it('should handle recipe not found', async () => {

//       //GIVEN
//       Recipe.findById.mockResolvedValue(null); // Simulate recipe not found

//       const req = httpMocks.createRequest({
//         params: {
//           //id: 'nonexistentId'
//           id: '5c88fa8cf4afda39709c2951'
//         }
//       });

//       const res = httpMocks.createResponse();

//       const expectedErrorMessage = 'No recipe found with that ID'

//       //WHEN
//       await recipeController.getRecipeById(req, res);

//       //THEN
//       expect(res.statusCode).toBe(404);

//       //JONAS API NOT FOUND MESSAGE  - GREAT!
//         expect(res._getJSONData().message).toBe(expectedErrorMessage);

//       //expect(res._getJSONData().message).toBe('No recipe found with that ID!')
//     });

//     it('should handle errors when getting a recipe by ID', async () => {
//       const errorMessage = 'Database error';
//       Recipe.findById.mockRejectedValue(new Error(errorMessage));

//       const req = httpMocks.createRequest({
//         params: {
//           id: 'mockId'
//         }
//       });
//       const res = httpMocks.createResponse();

//       await recipeController.getRecipeById(req, res);

//       expect(res.statusCode).toBe(500);
//       expect(res._getJSONData().message).toBe(errorMessage);
//     });
//   });

//});

/////////////////INTEGRATION- TESTS////////////
// // tests/recipeController.test.js
// const request = require('supertest');
// const app = require('../app');

// describe('Recipe Controller', () => {
//   it('should return custom error for /api/v1/recipes', async () => {
//     const res = await request(app).get('/api/v1/recipe');

//     expect(res.statusCode).toBe(404);
//     expect(res.body.status).toBe('fail');
//     //expect(res.body.message).toBe('This is a custom error message.');
//   });
// });
