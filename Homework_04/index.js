import express from "express";
import bookRouter from "./routes/books.routes.js";
import logger from "./middlewares/logger.middleware.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";

const PORT = 3000;
const HOSTNAME = "localhost";

const app = express();

app.use(express.json());
app.use(logger);
app.use("/books", bookRouter);
app.use(errorHandlerMiddleware);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running on http://${HOSTNAME}:${PORT}/books`);
  console.log(
    `To get a single book by ID, use the route: http://${HOSTNAME}:${PORT}/books/:id`
  );
});
