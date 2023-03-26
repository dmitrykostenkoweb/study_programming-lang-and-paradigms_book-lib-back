

import express, { type Request, type Response } from 'express';
import {BookController} from '../controllers/bookController';


const router = express.Router();
const bookController = new BookController();

// Adding a new book
router.post('/books', async (req: Request, res: Response) => {
    try {
        const book = await bookController.createBook(req, res);
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Updating an existing book
router.patch('/books/:id', async (req: Request, res: Response) => {
    try {
        const book = await bookController.updateBook(req, res);
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Deleting a book
router.delete('/books/:id', async (req: Request, res: Response) => {
    try {

        const book = await bookController.deleteBook(req, res);
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Searching for books by title, author, or genre
router.get('/books', async (req: Request, res: Response) => {
    try {
        const { title, author, genre } = req.query;
        console.log( req.query)
        const query: { [key: string]: any } = {};
        if (title) query.title = title;
        if (author) query.author = author;
        if (genre) query.genre = genre;
        const books = await bookController.getAllBooks(req, res);
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
