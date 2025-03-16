import { FileService } from "../services/files.services.js";
import {
  BookNotFoundError,
  BookValidationError,
  InvalidRatingError,
  MissingReviewDetailsError,
} from "../exceptions.js";

class Book {
  constructor() {
    this.fileService = new FileService();
  }

  async getAllBooks(author, year) {
    let books = await this.fileService.readFile("books.json");

    if (author) {
      books = books.filter(
        (book) => book.author.toLowerCase() === author.toLowerCase()
      );
    }

    if (year) {
      books = books.filter((book) => book.year === parseInt(year));
    }

    return books;
  }

  async getBookById(id) {
    const books = await this.fileService.readFile("books.json");

    const book = books.find((book) => book.id === parseInt(id));

    if (!book) {
      throw new BookNotFoundError(id);
    }

    return book;
  }

  async addNewBook(body) {
    const { title, author, year, genre } = body;

    if (!title || !author || !year || !genre) {
      throw new BookValidationError(
        "All fields (title, author, year, genre) are required."
      );
    }

    const books = await this.fileService.readFile("books.json");

    const newBook = {
      id: books.length + 1,
      title,
      author,
      year,
      genre,
      reviews: [],
    };

    books.push(newBook);

    await this.fileService.writeFile("books.json", books);

    return newBook;
  }

  async deleteBookById(id) {
    const books = await this.fileService.readFile("books.json");

    const filteredBooks = books.filter((book) => book.id !== parseInt(id));

    if (filteredBooks.length === books.length) {
      throw new BookNotFoundError(id);
    }

    await this.fileService.writeFile("books.json", filteredBooks);
  }

  async updateBookById(id, body) {
    const books = await this.fileService.readFile("books.json");

    const index = books.findIndex((book) => book.id === parseInt(id));

    if (index < 0) {
      throw new BookNotFoundError(id);
    }

    books[index] = {
      ...books[index],
      ...body,
    };

    await this.fileService.writeFile("books.json", books);

    return books[index];
  }

  async getStats() {
    const books = await this.fileService.readFile("books.json");
    const totalBooks = books.length;

    const booksPerAuthor = books.reduce((acc, book) => {
      acc[book.author] = (acc[book.author] || 0) + 1;
      return acc;
    }, {});

    const oldestBook = books.reduce((oldest, current) => {
      return current.year < oldest.year ? current : oldest;
    });

    const newestBook = books.reduce((newest, current) => {
      return current.year > newest.year ? current : newest;
    });

    const stats = {
      totalBooks,
      booksPerAuthor,
      oldestBook,
      newestBook,
    };

    return stats;
  }

  async addReview(id, body) {
    const books = await this.fileService.readFile("books.json");

    const index = books.findIndex((book) => book.id === parseInt(id));

    if (index < 0) {
      throw new BookNotFoundError(id);
    }

    if (!body.comment || !body.reviewer || body.rating === undefined) {
      throw new MissingReviewDetailsError();
    }

    if (body.rating < 1 || body.rating > 5) {
      throw new InvalidRatingError();
    }

    const book = books[index];

    if (!book.reviews) {
      book.reviews = [];
    }

    book.reviews.push(body);

    await this.fileService.writeFile("books.json", books);

    return book;
  }

  async getAllReviewsForABook(id) {
    const books = await this.fileService.readFile("books.json");

    const book = books.find((book) => book.id === parseInt(id));

    if (!book) {
      throw new BookNotFoundError(id);
    }

    return book.reviews;
  }
}

export default Book;
