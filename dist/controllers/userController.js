"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = require("../models/userModel");
const authFunctions_1 = require("../auth/authFunctions");
/**
 * @route POST /api/v1/users/register
 * @description allows a user to register
 * @access public
 */
const register = (req, res, next) => {
    const filteredBody = authFunctions_1.authFunctions.sanitizeBody(req.body, "firstName", "lastName", "username", "email", "password", "passwordConfirm");
    const { firstName, lastName, username, email, password, passwordConfirm } = filteredBody;
    userModel_1.User.findOne({ email: email }).then((user) => {
        //Otherwise, attempt to find the user by email
        if (user) {
            res.status(400).json({
                status: "failed",
                data: {
                    message: "This email is already registered with an account. Please login or reset your password if you forgot it!",
                },
            });
        }
        else {
            const newUser = new userModel_1.User(filteredBody);
            bcryptjs_1.default.genSalt(10, (err, salt) => {
                //Generate a salt
                // eslint-disable-next-line no-shadow
                bcryptjs_1.default.hash(newUser.password, salt, (err, hash) => {
                    //Then a hash. Our password is now successfully hashed
                    if (err)
                        throw err;
                    newUser.password = hash; //then set it to the new salted and hashed password
                    newUser
                        .save() //Save the user in the database
                        .then(() => {
                        //then send a success message (just a json for now)
                        res.status(200).json({
                            status: "success",
                            data: {
                                message: "account successfully registered! Please check your email for a confirmation email to activate your account.",
                            },
                        });
                    })
                        .catch(() => {
                        //if any error happened after all that jank, send a 500 internal server error
                        res.status(500).json({
                            status: "failed",
                            data: {
                                message: "internal server error!",
                            },
                        });
                    });
                });
            });
        }
    });
};
exports.register = register;
