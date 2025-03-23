import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipe.routes.js";

dotenv.config();

const {
  PORT,
  HOST,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
  MONGO_DB_NAME,
} = process.env;

const URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();

app.use(express.json());

app.use("/api/recipes", recipeRoutes);

(async () => {
  try {
    await mongoose.connect(URI);
  } catch (error) {
    console.error("Error while connecting to Mongo DB", error);
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server started listening on http://${HOST}:${PORT}`);
  });
})();
