import { Router } from "express";
import RecipeController from "../controllers/recipe.controller.js";
import validateRequest from "../middlewares/validate-request.middleware.js";
import {
  createRecipeSchema,
  updateRecipeSchema,
} from "../schemas/recipe.schema.js";

const router = Router();
const recipeController = new RecipeController();

router.get("/", recipeController.getAllRecipes);
router.get("/search", recipeController.searchRecipesByTitle);
router.get("/:id", recipeController.getRecipeByID);
router.post(
  "/",
  validateRequest(createRecipeSchema),
  recipeController.createRecipe
);
router.put(
  "/:id",
  validateRequest(updateRecipeSchema),
  recipeController.updateRecipe
);
router.delete("/:id", recipeController.deleteRecipe);
router.get("/category/:category", recipeController.getRecipesByCategory);

export default router;
