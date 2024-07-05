const mongoose = require("mongoose");
const Recipe = require("../../models/Recipe");
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/forkify");

mongoose.connection.on("connected", async () => {
  console.log("Connected to MongoDB");

  // Create some sample recipes
  const recipes = [
    {
      title: "Pizza Crispi",
      publisher: "John Doe",
      source_url: "http://example.com/pizza-crispi",
      image_url: "http://example.com/images/pizza-crispi.jpg",
      servings: 4,
      cooking_time: 30,
      ingredients: [
        { quantity: 1, unit: "cup", description: "Flour" },
        { quantity: 0.5, unit: "cup", description: "Water" },
        { quantity: 1, unit: "tbsp", description: "Olive oil" },
      ],
    },
    {
      title: "Spaghetti Bolognese",
      publisher: "Jane Doe",
      source_url: "http://example.com/spaghetti-bolognese",
      image_url: "http://example.com/images/spaghetti-bolognese.jpg",
      servings: 4,
      cooking_time: 45,
      ingredients: [
        { quantity: 200, unit: "g", description: "Spaghetti" },
        { quantity: 1, unit: "cup", description: "Tomato sauce" },
        { quantity: 100, unit: "g", description: "Ground beef" },
      ],
    },
    {
      title: "Chicken Curry",
      publisher: "Alice Smith",
      source_url: "http://example.com/chicken-curry",
      image_url: "http://example.com/images/chicken-curry.jpg",
      servings: 4,
      cooking_time: 60,
      ingredients: [
        { quantity: 500, unit: "g", description: "Chicken breast" },
        { quantity: 2, unit: "tbsp", description: "Curry powder" },
        { quantity: 1, unit: "cup", description: "Coconut milk" },
      ],
    },
    {
      title: "Beef Tacos",
      publisher: "Bob Johnson",
      source_url: "http://example.com/beef-tacos",
      image_url: "http://example.com/images/beef-tacos.jpg",
      servings: 4,
      cooking_time: 25,
      ingredients: [
        { quantity: 300, unit: "g", description: "Ground beef" },
        { quantity: 8, unit: "pieces", description: "Taco shells" },
        { quantity: 1, unit: "cup", description: "Shredded lettuce" },
      ],
    },
    {
      title: "Vegetable Stir Fry",
      publisher: "Carol Lee",
      source_url: "http://example.com/vegetable-stir-fry",
      image_url: "http://example.com/images/vegetable-stir-fry.jpg",
      servings: 4,
      cooking_time: 20,
      ingredients: [
        { quantity: 2, unit: "cups", description: "Mixed vegetables" },
        { quantity: 1, unit: "tbsp", description: "Soy sauce" },
        { quantity: 1, unit: "tbsp", description: "Olive oil" },
      ],
    },
    {
      title: "Salmon Teriyaki",
      publisher: "David Brown",
      source_url: "http://example.com/salmon-teriyaki",
      image_url: "http://example.com/images/salmon-teriyaki.jpg",
      servings: 4,
      cooking_time: 35,
      ingredients: [
        { quantity: 4, unit: "fillets", description: "Salmon" },
        { quantity: 2, unit: "tbsp", description: "Teriyaki sauce" },
        { quantity: 1, unit: "tbsp", description: "Sesame seeds" },
      ],
    },
    {
      title: "Quinoa Salad",
      publisher: "Eve Green",
      source_url: "http://example.com/quinoa-salad",
      image_url: "http://example.com/images/quinoa-salad.jpg",
      servings: 4,
      cooking_time: 20,
      ingredients: [
        { quantity: 1, unit: "cup", description: "Quinoa" },
        { quantity: 1, unit: "cup", description: "Cherry tomatoes" },
        { quantity: 1, unit: "cup", description: "Cucumber" },
      ],
    },
    {
      title: "Mushroom Risotto",
      publisher: "Frank Harris",
      source_url: "http://example.com/mushroom-risotto",
      image_url: "http://example.com/images/mushroom-risotto.jpg",
      servings: 4,
      cooking_time: 45,
      ingredients: [
        { quantity: 2, unit: "cups", description: "Arborio rice" },
        { quantity: 1, unit: "cup", description: "Mushrooms" },
        { quantity: 1, unit: "cup", description: "Parmesan cheese" },
      ],
    },
    {
      title: "Pancakes",
      publisher: "Grace Martin",
      source_url: "http://example.com/pancakes",
      image_url: "http://example.com/images/pancakes.jpg",
      servings: 4,
      cooking_time: 15,
      ingredients: [
        { quantity: 1, unit: "cup", description: "Flour" },
        { quantity: 1, unit: "cup", description: "Milk" },
        { quantity: 1, unit: "piece", description: "Egg" },
      ],
    },
    {
      title: "Beef Stroganoff",
      publisher: "Henry White",
      source_url: "http://example.com/beef-stroganoff",
      image_url: "http://example.com/images/beef-stroganoff.jpg",
      servings: 4,
      cooking_time: 40,
      ingredients: [
        { quantity: 500, unit: "g", description: "Beef" },
        { quantity: 1, unit: "cup", description: "Sour cream" },
        { quantity: 1, unit: "cup", description: "Mushrooms" },
      ],
    },
    {
      title: "Greek Salad",
      publisher: "Ivy Wilson",
      source_url: "http://example.com/greek-salad",
      image_url: "http://example.com/images/greek-salad.jpg",
      servings: 4,
      cooking_time: 15,
      ingredients: [
        { quantity: 1, unit: "cup", description: "Cucumber" },
        { quantity: 1, unit: "cup", description: "Tomatoes" },
        { quantity: 0.5, unit: "cup", description: "Feta cheese" },
      ],
    },
    {
      title: "Chicken Alfredo",
      publisher: "Jack Thomas",
      source_url: "http://example.com/chicken-alfredo",
      image_url: "http://example.com/images/chicken-alfredo.jpg",
      servings: 4,
      cooking_time: 30,
      ingredients: [
        { quantity: 2, unit: "pieces", description: "Chicken breasts" },
        { quantity: 1, unit: "cup", description: "Cream" },
        { quantity: 1, unit: "cup", description: "Parmesan cheese" },
      ],
    },
    {
      title: "Lentil Soup",
      publisher: "Karen Garcia",
      source_url: "http://example.com/lentil-soup",
      image_url: "http://example.com/images/lentil-soup.jpg",
      servings: 4,
      cooking_time: 50,
      ingredients: [
        { quantity: 1, unit: "cup", description: "Lentils" },
        { quantity: 2, unit: "pieces", description: "Carrots" },
        { quantity: 1, unit: "cup", description: "Celery" },
      ],
    },
    {
      title: "Apple Pie",
      publisher: "Larry Anderson",
      source_url: "http://example.com/apple-pie",
      image_url: "http://example.com/images/apple-pie.jpg",
      servings: 8,
      cooking_time: 60,
      ingredients: [
        { quantity: 5, unit: "pieces", description: "Apples" },
        { quantity: 1, unit: "cup", description: "Sugar" },
        { quantity: 1, unit: "tsp", description: "Cinnamon" },
      ],
    },
    {
      title: "Chocolate Cake",
      publisher: "Megan Clark",
      source_url: "http://example.com/chocolate-cake",
      image_url: "http://example.com/images/chocolate-cake.jpg",
      servings: 8,
      cooking_time: 60,
      ingredients: [
        { quantity: 2, unit: "cups", description: "Flour" },
        { quantity: 1, unit: "cup", description: "Cocoa powder" },
        { quantity: 1, unit: "cup", description: "Sugar" },
      ],
    },
  ];

  try {
    // Insert the recipes into the database
    await Recipe.insertMany(recipes);
    console.log(`${recipes.length} Recipes inserted successfully`);
  } catch (error) {
    console.error("Error inserting recipes:", error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});
