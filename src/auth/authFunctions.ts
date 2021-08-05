import { Post } from "../models/postModel";
import { Comment } from "../models/commentModel";
import { User } from "../models/userModel";
import { allowedNodeEnvironmentFlags } from "process";

export interface Body {
  [key: string]: string;
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
};
