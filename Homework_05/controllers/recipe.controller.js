import Recipe from "../models/recipe.model.js";

class RecipeController {
  async getAllRecipes(req, res) {
    try {
      const { difficulty, category } = req.query;

      const filter = {};

      const validDifficulties = ["easy", "medium", "hard"];
      if (difficulty && !validDifficulties.includes(difficulty)) {
        return res.status(400).send({
          error: `Invalid difficulty: ${difficulty}. Allowed difficulties are ${validDifficulties.join(
            ", "
          )}.`,
        });
      }

      const validCategories = ["breakfast", "lunch", "dinner", "dessert"];
      if (category && !validCategories.includes(category)) {
        return res.status(400).send({
          error: `Invalid category: ${category}. Allowed categories are ${validCategories.join(
            ", "
          )}.`,
        });
      }

      if (difficulty) {
        filter.difficulty = difficulty;
      }

      if (category) {
        filter.category = category;
      }

      const recipes = await Recipe.find(filter);

      if (recipes.length === 0) {
        return res.status(404).send({
          error: "No recipes found with the specified filters.",
        });
      }

      res.send(recipes);
    } catch (error) {
      res.status(500).send({
        error: "An error occurred while fetching the recipes.",
      });
    }
  }

  async getRecipeByID(req, res) {
    try {
      const recipe = await Recipe.findById(req.params.id);

      if (!recipe) {
        return res.status(404).send({
          error: `Recipe with id: ${req.params.id} is not found.`,
        });
      }

      res.send(recipe);
    } catch (error) {
      res.status(500).send({
        error: "An error occurred while fetching the recipe.",
      });
    }
  }
  async createRecipe(req, res) {
    try {
      const {
        title,
        description,
        ingredients,
        instructions,
        cookingTime,
        difficulty,
        isVegetarian,
        category,
      } = req.body;

      const recipe = new Recipe({
        title,
        description,
        ingredients,
        instructions,
        cookingTime,
        difficulty,
        isVegetarian,
        category,
      });

      const createdRecipe = await recipe.save();

      res.status(201).send(createdRecipe);
    } catch (error) {
      res.status(500).send({
        error: "An error occurred while creating the recipe.",
      });
    }
  }

  async updateRecipe(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;

      const recipe = await Recipe.findByIdAndUpdate(id, body, {
        new: true,
      });

      if (!recipe) {
        return res.status(404).send({
          error: `Recipe with id: ${id} not found.`,
        });
      }

      res.send(recipe);
    } catch (error) {
      res.status(500).send({
        error: "An error occurred while updating the recipe.",
      });
    }
  }

  async deleteRecipe(req, res) {
    try {
      const { id } = req.params;

      const recipe = await Recipe.findByIdAndDelete(id);

      if (!recipe) {
        return res.status(404).send({
          error: `Recipe with id: ${id} not found.`,
        });
      }

      res.send({
        message: `Recipe with id: ${id} has been deleted successfully.`,
      });
    } catch (error) {
      res.status(500).send({
        error: "An error occurred while deleting the recipe.",
      });
    }
  }

  async getRecipesByCategory(req, res) {
    try {
      const { category } = req.params;

      const validCategories = ["breakfast", "lunch", "dinner", "dessert"];

      if (!validCategories.includes(category)) {
        return res.status(400).send({
          error: `Invalid category: ${category}. Allowed categories are ${validCategories.join(
            ", "
          )}.`,
        });
      }

      const recipes = await Recipe.find({ category });

      if (recipes.length === 0) {
        return res.status(404).send({
          error: `No recipes found for cathegory: ${category}.`,
        });
      }
      res.send(recipes);
    } catch (error) {
      res.status(500).send({
        error: "An error occurred while fetching the recipes by category.",
      });
    }
  }

  async searchRecipesByTitle(req, res) {
    console.log("searchRecipesByTitle function called"); // Debugging log

    try {
      const { title } = req.query;

      if (!title || title.trim() === "") {
        console.log("Invalid title provided");
        return res.status(400).send({
          error: "Please provide a valid title to search for.",
        });
      }

      console.log("Searching for recipes with title:", title);

      const recipes = await Recipe.find({
        title: { $regex: title, $options: "i" },
      });

      console.log("Recipes found:", recipes.length);

      if (recipes.length === 0) {
        return res.status(404).send({
          error: `No recipes found with title containing: ${title}.`,
        });
      }

      res.send(recipes);
    } catch (error) {
      console.log("Error in searchRecipesByTitle:", error); // Log actual error
      res.status(500).send({
        error: "An error occurred while fetching the recipes by title.",
      });
    }
  }
}

export default RecipeController;
