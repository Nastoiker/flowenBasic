"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthMiddleware {
    constructor(secret) {
        this.secret = secret;
    }
    execute(req, res, next) {
        if (req.headers.authorization) {
            try {
                const { email } = (0, jsonwebtoken_1.verify)(req.headers.authorization.split(' ')[1], this.secret);
                req.user = email.toString();
                next();
            }
            catch (_a) {
                next();
            }
        }
        else
            next();
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map