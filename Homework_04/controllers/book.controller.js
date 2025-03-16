import Book from "../models/book.model.js";

class BookController {
  async getAllBooks(req, res) {
    const { author, year } = req.query;

    const books = await new Book().getAllBooks(author, year);

    res.send(books);
  }

  async getBookById(req, res, next) {
    try {
      const { id } = req.params;
      const book = await new Book().getBookById(id);
      res.send(book);
    } catch (error) {
      next(error);
    }
  }

  async addNewBook(req, res, next) {
    try {
      const book = await new Book().addNewBook(req.body);
      res.send(book);
    } catch (error) {
      next(error);
    }
  }

  async deleteBookById(req, res, next) {
    try {
      const { id } = req.params;
      await new Book().deleteBookById(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  async updateBookById(req, res, next) {
    try {
      const { id } = req.params;
      const book = await new Book().updateBookById(id, req.body);
      res.send(book);
    } catch (error) {
      next(error);
    }
  }

  async getStats(req, res) {
    const stats = await new Book().getStats();

    res.send(stats);
  }

  async addReview(req, res, next) {
    try {
      const { id } = req.params;
      const book = await new Book().addReview(id, req.body);

      res.send(book);
    } catch (error) {
      next(error);
    }
  }

  async getAllReviewsForABook(req, res, next) {
    try {
      const { id } = req.params;
      const reviews = await new Book().getAllReviewsForABook(id);
      res.send(reviews);
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;
