import express from "express";
import fs from "fs/promises";

const app = express();
const PORT = 3000;
const HOSTNAME = "localhost";

app.use(express.json());

const TASKS_FILE_PATH = "./data/books.json";

// Get all books or filter by author/year
app.get("/books", async (req, res) => {
  try {
    const books = await fs.readFile(TASKS_FILE_PATH, "utf-8");
    let booksArray = JSON.parse(books);

    const { author, year } = req.query;

    if (author) {
      booksArray = booksArray.filter(
        (book) => book.author.toLowerCase() === author.toLowerCase()
      );
    }

    if (year) {
      booksArray = booksArray.filter((book) => book.year === parseInt(year));
    }

    res.json(booksArray);
  } catch (error) {
    res.status(500).json({ message: "Error reading the books file." });
  }
});

// Get single book by ID
app.get("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const books = await fs.readFile(TASKS_FILE_PATH, "utf-8");

    const booksArray = JSON.parse(books);

    const book = booksArray.find((b) => b.id === parseInt(id));

    if (book) {
      res.json(book);
    } else {
      res.status(404).send({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error reading the books file." });
  }
});

// Add new book
app.post("/books", async (req, res) => {
  try {
    const books = await fs.readFile(TASKS_FILE_PATH, "utf-8");
    const booksArray = JSON.parse(books);

    const { title, author, year } = req.body;

    if (!title || !author || !year) {
      return res
        .status(400)
        .send({ message: "All fields (title, author, year) are required." });
    }

    const newBook = {
      id: booksArray.length + 1,
      title,
      author,
      year,
    };

    booksArray.push(newBook);

    await fs.writeFile(TASKS_FILE_PATH, JSON.stringify(booksArray, null, 2));

    res.status(201).send(newBook);
  } catch (error) {
    res.status(500).send({ message: "Error writing to the books file." });
  }
});

// Delete a book by ID
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const books = await fs.readFile(TASKS_FILE_PATH, "utf-8");
    const booksArray = JSON.parse(books);

    const filteredBooks = booksArray.filter((book) => book.id !== parseInt(id));

    if (filteredBooks.length === booksArray.length) {
      return res.status(404).json({ message: "Book not found" });
    }

    await fs.writeFile(TASKS_FILE_PATH, JSON.stringify(filteredBooks, null, 2));

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get statistics about books
app.get("/stats", async (req, res) => {
  try {
    const books = await fs.readFile(TASKS_FILE_PATH, "utf-8");
    const booksArray = JSON.parse(books);

    const totalBooks = booksArray.length;

    const booksPerAuthor = booksArray.reduce((acc, book) => {
      acc[book.author] = (acc[book.author] || 0) + 1;
      return acc;
    }, {});

    const oldestBook = booksArray.reduce((oldest, current) => {
      return current.year < oldest.year ? current : oldest;
    });

    const newestBook = booksArray.reduce((newest, current) => {
      return current.year > newest.year ? current : newest;
    });

    res.json({
      totalBooks,
      booksPerAuthor,
      oldestBook,
      newestBook,
    });
  } catch (error) {
    res.status(500).json({ message: "Error reading the books file." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/books`);
  console.log(
    `To get a single book by ID, use the route: http://localhost:${PORT}/books/:id`
  );
});
