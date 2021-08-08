"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const authFunctions_1 = require("../auth/authFunctions");
const router = express_1.Router();
router
    .route("/")
    .get(postController_1.getAllPosts)
    .post(authFunctions_1.authFunctions.authenticateUser, postController_1.createPost);
exports.default = router;
