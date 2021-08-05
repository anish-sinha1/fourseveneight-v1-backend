import { RequestHandler } from "express";
import { Post, IPost } from "../models/postModel";
import { Document } from "mongoose";
import { Body, authFunctions } from "../auth/authFunctions";

/**
 * @route GET /api/v1/posts/
 * @description Fetches all posts from the database
 * @access public
 */

export const getAllPosts: RequestHandler = async (req, res, next) => {
  try {
    const doc: Document[] = await Post.find();
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      data: {
        message: err,
      },
    });
  }
};

/**
 * @route POST /api/v1/posts/
 * @description creates a post with a cleaned version of the request body (to prevent security issues)
 * @access protected
 */

export const createPost: RequestHandler = async (req, res, next) => {
  try {
    const sanitizedBody: Body = authFunctions.sanitizeBody(
      req.body,
      "title",
      "content",
      "tags",
      "length",
      "difficulty",
      "commentsActive"
    );
    console.log(sanitizedBody);
    const doc: IPost = await Post.create(sanitizedBody);
    res.status(201).json({
      status: "success!",
      data: {
        doc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      data: {
        message: err,
      },
    });
  }
};
