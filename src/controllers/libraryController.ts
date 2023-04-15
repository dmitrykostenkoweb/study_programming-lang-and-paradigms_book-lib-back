import express, { Request, Response, Router } from "express";
import BookService from "../service/bookService";
import UserService from "../service/userService";
import { generateCurrentDate } from "../utils";
import Book, { IBook } from "../models/book.model";
import User, { ICheckedOut, IUser } from "../models/user.model";

export class LibraryController {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/lease/:userId/:bookId", this.leaseBook);
    this.router.post("/return/:userId/:bookId", this.returnBook);
  }

  bookService: BookService = new BookService();
  userService: UserService = new UserService();
  private async leaseBook(req: Request, res: Response): Promise<void> {
    try {
      const { userId, bookId } = req.body;
      console.log("userId", userId);
      console.log("bookId", bookId);
      await User.findById(userId).then((user: IUser | null) => {
        if (!user) return res.status(404).send("User not found");

        user.checked_out.push({
          book_id: bookId,
          lease_date: generateCurrentDate(),
        });

        user.save();
      });

      await Book.findById(bookId).then((book: IBook | null) => {
        if (!book) return res.status(404).send("Book not found");
        if (!book.available)
          return res.status(400).send("The book is already leased");

        book.available = false;

        book.save();
      });

      res.status(200).send("The book leased successfully");
    } catch (error) {
      res.status(500).send("Server error");
    }
  }

  private async returnBook(req: Request, res: Response): Promise<void> {
    try {
      const { userId, bookId } = req.body;

      this.userService.findUserById(userId).then((user: IUser | null) => {
        if (!user) return res.status(404).send("User not found");

        user.checked_out = user.checked_out.filter(
          (book: ICheckedOut): boolean => book.book_id !== bookId
        );

        user.save();
      });

      this.bookService.findBookById(bookId).then((book: IBook | null) => {
        if (!book) return res.status(404).send("Book not found");
        if (book.available)
          return res.status(400).send("The book is in the library");

        book.available = true;

        book.save();
      });

      res.status(200).send("The book returned successfully");
    } catch (error) {
      res.status(500).send("Server error");
    }
  }
}

export default new LibraryController().router;
