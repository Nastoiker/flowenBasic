"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
const dotenv_1 = require("dotenv");
class AdminGuard {
    execute(req, res, next) {
        const result = (0, dotenv_1.config)();
        this._config = result.parsed;
        if (req.user == this._config['ADMIN_EMAIL']) {
            return next();
        }
        res.status(401).send({ error: 'вы не зашли под админа' });
    }
}
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map