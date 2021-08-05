import express, { RequestHandler, Router } from "express";
import { register } from "../controllers/userController";

const router = Router();

router.route("/").post(register);

export default router;
