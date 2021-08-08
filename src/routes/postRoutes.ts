import express, { RequestHandler, Router } from "express";
import { getAllPosts, createPost } from "../controllers/postController";
import { authFunctions } from "../auth/authFunctions";
const router = Router();

router
  .route("/")
  .get(getAllPosts)
  .post(authFunctions.authenticateUser, createPost);

export default router;
