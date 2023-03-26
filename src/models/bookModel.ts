import { Document, model, Schema } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
}


const bookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true }
});

export default model<IBook>('Book', bookSchema);
