"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
class MulterMiddleware {
    execute(req, res, next) {
        const storage = multer_1.default.memoryStorage();
        const upload = (0, multer_1.default)({ storage }).single('files');
        try {
            upload(req, res, (err) => {
                var _a;
                console.log('1' + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname));
                if (err) {
                    throw new Error('1 error');
                }
                else {
                    next();
                }
            });
        }
        catch (_a) {
            res.status(400).send({ error: 'asdasdasdasd' });
        }
    }
}
exports.MulterMiddleware = MulterMiddleware;
//# sourceMappingURL=Multer.middleware.js.map