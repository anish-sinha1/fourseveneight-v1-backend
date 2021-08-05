import mongoose, { model, Schema, Model, Document } from "mongoose";
import validator from "validator";
import crypto from "crypto";
import spaces from "../keys/tags";
import { possibleRoles as roles } from "../keys/enums";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  confirmedEmail: boolean;
  username: string;
  password: string;
  profilePhoto: string;
  role: string;
  active: boolean;
  accountCreatedAt: Date;
  passwordChangedAt?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  twoFactorAuthCode?: string;
  spaces?: string[];
  bio?: string;
  followers?: mongoose.Schema.Types.ObjectId[];
  comments?: mongoose.Schema.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      validate: validator.isEmail,
    },
    confirmedEmail: {
      type: Boolean,
      required: false,
      default: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      maxlength: 18,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    profilePhoto: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    active: {
      type: Boolean,
      default: false,
    },
    accountCreatedAt: {
      type: Date,
      default: Date.now(),
    },
    passwordChangedAt: {
      type: Date,
      required: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
      select: false,
    },
    twoFactorAuthCode: {
      type: String,
      required: false,
      select: false,
    },
    spaces: {
      type: [String],
      enum: spaces,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
        required: false,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.methods.generatePasswordResetToken = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = new Date();
};

export const User: Model<IUser> = model("User", userSchema);
