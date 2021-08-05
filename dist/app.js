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
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: `src/config/config.env` });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
require("./auth/passportConfig")(passport_1.default);
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = express_1.default();
process.on("uncaughtException", () => {
    process.exit(1);
});
app.use(express_1.default.json());
app.use(express_session_1.default({
    secret: `${process.env.SESSION_SECRET}`,
    resave: true,
    saveUninitialized: true,
}));
const DB = process.env.DATABASE.replace(/<password>/gi, process.env.DATABASE_PASSWORD);
const port = process.env.PORT || 8000;
const currentTime = new Date();
mongoose_1.default
    .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log(`Database connection successful as of ${currentTime.toLocaleString()}!\nServer running on port ${port}`);
})
    .catch((err) => {
    console.log(err);
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/api/v1/posts", postRoutes_1.default);
app.use("/api/v1/users", userRoutes_1.default);
const server = app.listen(port);
process.on("unhandledRejection", (err) => {
    //On unhandled rejection, exit process
    // eslint-disable-next-line no-console
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
