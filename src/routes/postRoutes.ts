import express, { RequestHandler, Router } from "express";
import { getAllPosts, createPost } from "../controllers/postController";
const router = Router();

router.route("/").get(getAllPosts).post(createPost);

export default router;
