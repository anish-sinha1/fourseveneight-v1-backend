import express, { RequestHandler, Router } from "express";
import { login, logout, register } from "../controllers/userController";

const router = Router();

//public routes

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
