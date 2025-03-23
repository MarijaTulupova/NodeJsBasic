import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  cookingTime: {
    type: Number,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },
  isVegetarian: {
    type: Boolean,
  },
  category: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "dessert"],
  },
});

const Recipe = model("recipes", recipeSchema);

export default Recipe;
