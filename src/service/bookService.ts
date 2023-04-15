import Book, { IBook } from "../models/book.model";

class BookService {
  constructor() {}
  public findBookById(bookId: string): Promise<IBook | null> {
    return Book.findById(bookId);
  }
}

export default BookService;
