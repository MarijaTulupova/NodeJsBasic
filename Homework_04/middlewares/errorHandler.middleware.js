import {
  BookNotFoundError,
  BookValidationError,
  InvalidRatingError,
  MissingReviewDetailsError,
} from "../exceptions.js";

export default function errorHandlerMiddleware(err, req, res, next) {
  console.error(err.stack);

  if (err instanceof BookNotFoundError) {
    return res.status(404).json({ error: err.message });
  }

  if (
    err instanceof InvalidRatingError ||
    err instanceof MissingReviewDetailsError ||
    err instanceof BookValidationError
  ) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
}
