"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LocalStrategy = require("passport-local").Strategy;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = require("../models/userModel");
module.exports = function (passport) {
    //this function is what's going to be exported
    passport.use(new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
        //use local strategy (username, password)
        // Match user
        userModel_1.User.findOne({
            //find user by email
            username: username,
        })
            .select("+password")
            .then((user) => {
            if (!user) {
                //if there's no username, send this message
                return done(null, false, {
                    message: "That email is not registered",
                });
            }
            // Match password
            bcryptjs_1.default.compare(password, user.password, (err, isMatch) => {
                //match passwords with bcrypt
                if (err)
                    throw err; //throw err if one exists
                if (isMatch) {
                    //if match, return null for the error and user
                    return done(null, user);
                }
                return done(null, false, { message: "Password incorrect" }); //otherwise return null, nothing, and a message
            });
        });
    }));
    passport.serializeUser((user, done) => {
        //serialize user
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        //deserialize user
        userModel_1.User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
