import mongoose, { model, Schema, Model, Document } from "mongoose";
import slugify from "slugify";
import tags from "../keys/tags";
import {
  possibleLengthDescriptors,
  possibleDifficultyLevels,
} from "../keys/enums";

export interface Post extends Document {
  title: string;
  content: string;
  publicationDate: Date;
  active: boolean;
  slug: string;
  authors: mongoose.Schema.Types.ObjectId[];
  tags: string[];
  length: string;
  difficulty: string;
  likes: number;
  comments: mongoose.Schema.Types.ObjectId[];
  commentsActive: boolean;
}

const postSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "A post must have a title!"],
      unique: [true, "Title must be unique!"],
    },
    content: {
      type: String,
      required: [true, "A post must have content!"],
      unique: [true, "Post content must be unique!"],
    },
    publicationDate: {
      type: Date,
      default: Date.now(),
    },
    active: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      unique: [true, "Each slug must be unique!"],
    },
    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    tags: {
      type: [String],
      enum: tags,
      min: 1,
      max: 5,
    },
    length: {
      type: String,
      enum: possibleLengthDescriptors,
      required: true,
    },
    difficulty: {
      type: String,
      enum: possibleDifficultyLevels,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    commentsActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Post: Model<Post> = model("Post", postSchema);
