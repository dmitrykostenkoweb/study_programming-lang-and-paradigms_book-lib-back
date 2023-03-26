import { Document, model, Schema } from "mongoose";

export interface IBooksCheckedOut extends Document {
  book_id: string;
  due_date: string;
}
export interface IUser extends Document {
  name: string;
  email: string;
  books_checked_out: IBooksCheckedOut[];
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  books_checked_out: { type: Array, required: false },
});

export default model<IUser>("User", userSchema);
