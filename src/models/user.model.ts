import { Document, model, Schema } from "mongoose";

export interface ICheckedOut {
  book_id: string;
  lease_date: string;
}
const checkedOutSchema: Schema = new Schema({
  book_id: { type: String, required: false },
  lease_date: { type: String, required: false },
});
export interface IUser extends Document {
  name: string;
  email: string;
  checked_out: ICheckedOut[];
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  checked_out: { type: Array(checkedOutSchema), required: false },
});

export default model<IUser>("User", userSchema);
