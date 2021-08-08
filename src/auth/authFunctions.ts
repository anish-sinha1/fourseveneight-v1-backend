import { Post } from "../models/postModel";
import { Comment } from "../models/commentModel";
import { User } from "../models/userModel";
import { allowedNodeEnvironmentFlags } from "process";
import express, { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
import { IUser } from "../models/userModel";

export interface Body {
  [key: string]: string | ObjectId[] | string[];
}

export const authFunctions: any = {
  sanitizeBody: function (obj: Body, ...allowed: string[]) {
    const sanitizedObject = {} as Body;
    Object.keys(obj).forEach((el: string) => {
      if (allowed.includes(el)) {
        sanitizedObject[el] = obj[el];
      }
    });
    return sanitizedObject;
  },
  authenticateUser: function (req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(403).json({
      status: "failed",
      data: {
        message: "unable to authenticate!",
      },
    });
  },
};
