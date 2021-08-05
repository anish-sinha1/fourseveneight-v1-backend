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
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const crypto_1 = __importDefault(require("crypto"));
const tags_1 = __importDefault(require("../keys/tags"));
const enums_1 = require("../keys/enums");
const userSchema = new mongoose_1.Schema({
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
        validate: validator_1.default.isEmail,
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
        enum: enums_1.possibleRoles,
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
        enum: tags_1.default,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    followers: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
    ],
    comments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Comments",
            required: false,
        },
    ],
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
userSchema.methods.generatePasswordResetToken = function () {
    this.resetPasswordToken = crypto_1.default.randomBytes(20).toString("hex");
    this.resetPasswordExpires = new Date();
};
exports.User = mongoose_1.model("User", userSchema);
