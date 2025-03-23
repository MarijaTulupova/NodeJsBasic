import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters long")
    .max(50, "Title cannot exceed 50 characters"),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters long")
    .max(100, "Description cannot exceed 200 characters"),

  ingredients: z
    .array(z.string())
    .min(1, "At least one ingredient is required"),

  instructions: z
    .array(z.string())
    .min(1, "At least one instruction is required"),

  cookingTime: z
    .number()
    .int("Cooking time must be an integer")
    .min(1, "Cooking time must be at least 1 minute")
    .optional(),

  difficulty: z.enum(["easy", "medium", "hard"]),

  isVegetarian: z.boolean().optional(),

  category: z.enum(["breakfast", "lunch", "dinner", "dessert"]),
});

export const updateRecipeSchema = createRecipeSchema.partial();
