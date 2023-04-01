import express, { Request, Response, Router } from "express";
import Book, { IBook } from "../models/book.model";

class BookController {
  private path: string = "/books";
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.getBooks);
    this.router.post(this.path, this.createBook);
    this.router.get(`${this.path}/:id`, this.getBookById);
    this.router.put(`${this.path}/:id`, this.updateBook);
    this.router.delete(`${this.path}/:id`, this.deleteBook);
  }
  private async getBooks(req: Request, res: Response): Promise<void> {
    try {
      const { title, author, genre } = req.query;
      const query: { [key: string]: any } = {};
      if (title) query["title"] = title;
      if (author) query["author"] = author;
      if (genre) query["genre"] = genre;

      const books: IBook[] = await Book.find(query);
      res.send(books);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  private async createBook(req: Request, res: Response): Promise<void> {
    try {
      const book: IBook = new Book(req.body);
      await book.save();
      res.send(book);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  private async getBookById(
    req: Request,
    res: Response
  ): Promise<Response<IBook> | undefined> {
    try {
      const book: IBook | null = await Book.findById(req.params.id);
      if (!book) return res.status(404).send("Book not found");

      res.send(book);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  private async updateBook(
    req: Request,
    res: Response
  ): Promise<Response<IBook> | undefined> {
    try {
      const { params, body } = req;
      const book: IBook | null = await Book.findByIdAndUpdate(params.id, body, {
        new: true,
      });

      if (!book) return res.status(404).send("Book not found");

      res.send(book);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  private async deleteBook(
    req: Request,
    res: Response
  ): Promise<Response<IBook> | undefined> {
    try {
      const book: IBook | null = await Book.findByIdAndDelete(req.params.id);
      if (!book) return res.status(404).send("Book not found");

      res.send(book);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default new BookController().router;
