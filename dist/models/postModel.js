"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const tags_1 = __importDefault(require("../keys/tags"));
const enums_1 = require("../keys/enums");
const postSchema = new mongoose_1.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
    tags: {
        type: [String],
        enum: tags_1.default,
        required: true,
        min: 1,
        max: 5,
    },
    length: {
        type: String,
        enum: enums_1.possibleLengthDescriptors,
        required: true,
    },
    difficulty: {
        type: String,
        enum: enums_1.possibleDifficultyLevels,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    commentsActive: {
        type: Boolean,
        default: true,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.Post = mongoose_1.model("Post", postSchema);
