"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const router = express_1.Router();
router.route("/").get(postController_1.getAllPosts).post(postController_1.createPost);
exports.default = router;
