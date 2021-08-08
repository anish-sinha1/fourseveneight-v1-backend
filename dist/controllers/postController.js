"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.getAllPosts = void 0;
const postModel_1 = require("../models/postModel");
const authFunctions_1 = require("../auth/authFunctions");
const userModel_1 = require("../models/userModel");
/**
 * @route GET /api/v1/posts/
 * @description Fetches all posts from the database
 * @access public
 */
const getAllPosts = async (req, res, next) => {
    try {
        let doc = await postModel_1.Post.find();
        doc = JSON.stringify(doc);
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
/**
 * @route POST /api/v1/posts/
 * @description creates a post with a cleaned version of the request body (to prevent security issues)
 * @access protected
 */
const createPost = async (req, res, next) => {
    try {
        const sanitizedBody = authFunctions_1.authFunctions.sanitizeBody(req.body, "title", "content", "tags", "length", "difficulty", "commentsActive");
        const authors = [req.user._id];
        const authorNames = [];
        sanitizedBody.authors = authors;
        authors.map(async (authorId) => {
            const author = await userModel_1.User.findById(authorId);
            const fullName = [author === null || author === void 0 ? void 0 : author.firstName, author === null || author === void 0 ? void 0 : author.lastName].join(" ");
            authorNames.push(fullName);
        });
        console.log(authorNames);
        sanitizedBody.authorNames = authorNames;
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
