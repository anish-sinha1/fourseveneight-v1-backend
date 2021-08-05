"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.getAllPosts = void 0;
const postModel_1 = require("../models/postModel");
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
        const doc = await postModel_1.Post.create(req.body);
        res.status(200).json({
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
