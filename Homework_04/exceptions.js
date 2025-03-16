export class BookNotFoundError extends Error {
  constructor(id) {
    super(`Book with id: ${id} not found!`);
    this.name = "BookNotFoundError";
  }
}

export class BookValidationError extends Error {
  constructor(message = "Invalid book data") {
    super(message);
    this.name = "BookValidationError";
  }
}

export class InvalidRatingError extends Error {
  constructor(message = "Rating must be a number from 1 to 5.") {
    super(message);
    this.name = "InvalidRatingError";
  }
}

export class MissingReviewDetailsError extends Error {
  constructor(
    message = "You must provide rating, comment and a reviewer name."
  ) {
    super(message);
    this.name = "MissingReviewDetailsError";
  }
}
