const mongoose = require("mongoose");
const Recipe = require("../../models/Recipe");
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/forkify");

mongoose.connection.on("connected", async () => {
  console.log("Connected to MongoDB");

  try {
    // Delete all documents in the Recipe collection
    await Recipe.deleteMany({});
    console.log("All recipes deleted successfully");
  } catch (error) {
    console.error("Error deleting recipes:", error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});
