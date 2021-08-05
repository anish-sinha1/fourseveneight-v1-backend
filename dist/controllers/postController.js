"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.getAllPosts = void 0;
const postModel_1 = require("../models/postModel");
const authFunctions_1 = require("../auth/authFunctions");
const getAllPosts = async (req, res, next) => {
    try {
        const doc = await postModel_1.Post.find();
        res.status(200).json({
            status: "success",
            data: {
                doc,
            },
        });
    }
    catch (err) {
        res.status(400).json({
            status: "failed",
            data: {
                message: err,
            },
        });
    }
};
exports.getAllPosts = getAllPosts;
const createPost = async (req, res, next) => {
    try {
        const sanitizedBody = authFunctions_1.authFunctions.sanitizeBody(req.body, "title", "content", "tags", "length", "difficulty", "commentsActive");
        console.log(sanitizedBody);
        const doc = await postModel_1.Post.create(sanitizedBody);
        res.status(201).json({
            status: "success!",
            data: {
                doc,
            },
        });
    }
    catch (err) {
        res.status(400).json({
            status: "failed",
            data: {
                message: err,
            },
        });
    }
};
exports.createPost = createPost;
