import * as dotenv from "dotenv";
dotenv.config({ path: `src/config/config.env` });
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
require("./auth/passportConfig")(passport);

import postRouter from "./routes/postRoutes";
import userRouter from "./routes/userRoutes";

const app = express();
app.use(cors());
process.on("uncaughtException", () => {
  process.exit(1);
});

app.use(express.json());

app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`, // use session secret in config.env
    resave: true,
    saveUninitialized: true,
  })
);

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
      `Database connection successful as of ${currentTime.toLocaleString()}!\nServer running on port ${port}`
    );
  })
  .catch((err) => {
    console.log(err);
  });

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const server = app.listen(port);

process.on("unhandledRejection", (err: Error) => {
  //On unhandled rejection, exit process
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
