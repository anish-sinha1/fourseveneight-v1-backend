import * as dotenv from "dotenv";
dotenv.config({ path: `src/config/config.env` });
import express from "express";
import mongoose from "mongoose";

import postRouter from "./routes/postRoutes";

const app = express();

app.use(express.json());

const DB: string = process.env.DATABASE!.replace(
  /<password>/gi,
  process.env.DATABASE_PASSWORD!
);

const port = process.env.PORT || 8000;
const currentTime = new Date();

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      `Database connection successful as of ${currentTime.toLocaleString()}!`
    );
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/v1/posts", postRouter);

app.listen(port);
