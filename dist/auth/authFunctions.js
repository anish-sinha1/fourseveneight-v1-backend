"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authFunctions = void 0;
exports.authFunctions = {
    sanitizeBody: function (obj, ...allowed) {
        const sanitizedObject = {};
        Object.keys(obj).forEach((el) => {
            if (allowed.includes(el)) {
                sanitizedObject[el] = obj[el];
            }
        });
        return sanitizedObject;
    },
    authenticateUser: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.status(403).json({
            status: "failed",
            data: {
                message: "unable to authenticate!",
            },
        });
    },
};
