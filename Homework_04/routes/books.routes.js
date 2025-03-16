import { Router } from "express";
import BookController from "../controllers/book.controller.js";

const router = Router();
const bookController = new BookController();

router.get("/", bookController.getAllBooks);
router.get("/stats", bookController.getStats);
router.get("/:id", bookController.getBookById);
router.post("/", bookController.addNewBook);
router.delete("/:id", bookController.deleteBookById);
router.put("/:id", bookController.updateBookById);
router.post("/:id/reviews", bookController.addReview);
router.get("/:id/reviews", bookController.getAllReviewsForABook);

export default router;
