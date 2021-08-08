"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = express_1.Router();
//public routes
router.route("/register").post(userController_1.register);
router.route("/login").post(userController_1.login);
router.route("/logout").get(userController_1.logout);
exports.default = router;
