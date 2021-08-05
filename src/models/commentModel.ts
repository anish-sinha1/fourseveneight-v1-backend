import mongoose, { model, Schema, Model, Document } from "mongoose";

export interface IComment extends Document {
  author: mongoose.Schema.Types.ObjectId[];
  content: string;
  likes: number;
  active: boolean;
  timestamp: Date;
  threadStartedBelow: mongoose.Schema.Types.ObjectId;
  post: mongoose.Schema.Types.ObjectId;
  superUserModified: Boolean;
}

const commentSchema: Schema<IComment> = new Schema({
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  threadStartedBelow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  superUserModified: {
    type: Boolean,
    default: false,
  },
});

export const Comment: Model<IComment> = model("Comment", commentSchema);
