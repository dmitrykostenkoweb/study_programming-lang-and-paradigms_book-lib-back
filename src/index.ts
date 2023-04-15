import mongoose from "mongoose";
import express from "express";

import bookRouter from "./controllers/bookController";
import userController from "./controllers/userConroller";
import libraryController from "./controllers/libraryController";

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/book-library";

const app = express();

app.use(express.json());
app.use([bookRouter, userController, libraryController]);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
  } as any)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
