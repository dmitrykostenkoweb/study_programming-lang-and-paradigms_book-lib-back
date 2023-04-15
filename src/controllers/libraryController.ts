import express, { Request, Response, Router } from "express";
import Book, { IBook } from "../models/book.model";
import User, { ICheckedOut, IUser } from "../models/user.model";
import { generateCurrentDate } from "../utils";

export class LibraryController {
  public router: Router = express.Router();
  constructor() {
    this.initializeRoutes();
    console.log("lib controller");
  }

  private initializeRoutes(): void {
    this.router.post("/lease", this.leaseBook);
    this.router.post("/return", this.returnBook);
  }

  private async leaseBook(req: Request, res: Response): Promise<void> {
    try {
      const { body } = req;
      const { userId, bookId } = body;
      console.log("userId", userId);
      console.log("bookId", bookId);

      const user: IUser | null = await User.findById(userId);

      if (!user) await res.status(404).send("User not found");
      else {
        user.checked_out.push({
          book_id: bookId,
          lease_date: generateCurrentDate(),
        });

        await user.save();
      }

      const book: IBook | null = await Book.findById(bookId);
      if (!book) await res.status(404).send("Book not found");
      else if (!book.available)
        await res.status(400).send("The book is already leased");
      else {
        book.available = false;
        await book.save();
        await res.status(200).send("The book leased successfully");
      }
    } catch (error) {
      res.status(500).send("Server error");
    }
  }

  private async returnBook(req: Request, res: Response): Promise<void> {
    try {
      const { userId, bookId } = req.body;

      const user: IUser | null = await User.findById(userId);
      if (!user) await res.status(404).send("User not found");
      else {
        user.checked_out = user.checked_out.filter(
          (book: ICheckedOut): boolean => book.book_id !== bookId
        );
        await user.save();
      }

      const book: IBook | null = await Book.findById(bookId);
      if (!book) await res.status(404).send("Book not found");
      if (book?.available)
        await res.status(400).send("The book is in the library");
      else if (book) {
        book.available = true;
        await book.save();
      }

      res.status(200).send("The book returned successfully");
    } catch (error) {
      res.status(500).send("Server error");
    }
  }
}

export default new LibraryController().router;
