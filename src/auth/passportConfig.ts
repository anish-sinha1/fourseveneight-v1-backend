const LocalStrategy = require("passport-local").Strategy;
import bcrypt from "bcryptjs";

import { User, IUser } from "../models/userModel";

module.exports = function (passport: any) {
  //this function is what's going to be exported
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      (
        username: string,
        password: string,
        done: (
          param1: null | undefined | boolean,
          param2: Boolean | String | IUser,
          param3?: IUser | object
        ) => any
      ) => {
        //use local strategy (username, password)
        // Match user
        User.findOne({
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
            bcrypt.compare(password, user.password, (err, isMatch) => {
              //match passwords with bcrypt
              if (err) throw err; //throw err if one exists
              if (isMatch) {
                //if match, return null for the error and user
                return done(null, user);
              }
              return done(null, false, { message: "Password incorrect" }); //otherwise return null, nothing, and a message
            });
          });
      }
    )
  );

  passport.serializeUser(
    (
      user: IUser,
      done: (
        param1: null | undefined | boolean,
        param2: Boolean | String | IUser,
        param3?: any
      ) => any
    ) => {
      //serialize user
      done(null, user.id);
    }
  );

  passport.deserializeUser(
    (
      id: String,
      done: (
        param1: null | undefined | boolean | Error,
        param2: Boolean | String | IUser,
        param3?: any
      ) => any
    ) => {
      //deserialize user
      User.findById(id, (err: Error, user: IUser) => {
        done(err, user);
      });
    }
  );
};
