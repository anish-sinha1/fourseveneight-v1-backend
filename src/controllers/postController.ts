import { RequestHandler } from "express";
import { Post, IPost } from "../models/postModel";
import { Document } from "mongoose";

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

export const createPost: RequestHandler = async (req, res, next) => {
  try {
    const doc: Document = await Post.create(req.body);
    res.status(200).json({
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
