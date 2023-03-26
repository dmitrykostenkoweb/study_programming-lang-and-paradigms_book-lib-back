import mongoose from 'mongoose';
import express from 'express';

import bookRouter from './controllers/bookController';

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/book-library';
const app = express();
app.use(express.json())
app.use(bookRouter);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
} as any)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));
