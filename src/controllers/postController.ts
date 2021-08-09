import { RequestHandler, Request, Response, NextFunction } from "express";
import { Post, IPost } from "../models/postModel";
import mongoose from "mongoose";
import { Body, authFunctions } from "../auth/authFunctions";
import { IUser } from "../models/userModel";
declare module "express-serve-static-core" {
  interface Request {
    user: IUser;
  }
}

/**
 * @route GET /api/v1/posts/
 * @description Fetches all posts from the database
 * @access public
 */

export const getAllPosts: RequestHandler = async (req, res, next) => {
  try {
    let doc: IPost[] | string = await Post.find();
    doc = JSON.stringify(doc);
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

    const authors: mongoose.Schema.Types.ObjectId[] = [req.user._id];

    sanitizedBody.authors = authors;
    sanitizedBody.authorNames = [
      [req.user.firstName, req.user.lastName].join(" "),
    ];

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
