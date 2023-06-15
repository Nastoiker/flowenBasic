"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailController = void 0;
const inversify_1 = require("inversify");
const base_controller_1 = require("../common/base.controller");
const types_1 = require("../types");
const Auth_guard_1 = require("../common/Auth.guard");
const Multer_middleware_1 = require("../common/Multer.middleware");
const http_error_1 = require("../errors/http-error");
const Mail_service_1 = require("./Mail.service");
let MailController = class MailController extends base_controller_1.BaseController {
    constructor(configService, loggerService, mailService) {
        super(loggerService);
        this.configService = configService;
        this.loggerService = loggerService;
        this.mailService = mailService;
        this.bindRoutes([
            {
                path: '/sendNews',
                method: 'post',
                func: this.sendNews,
                middlewares: [new Auth_guard_1.AuthGuard(), new Multer_middleware_1.MulterMiddleware()],
            },
        ]);
    }
    sendNews(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.file) {
                const publish = yield this.mailService.sendForAll(req.file);
                if (typeof publish === null) {
                    return next(new http_error_1.HTTPError(401, 'ошибка публикации'));
                }
                else {
                    this.ok(res, { mes: 'новость опубликована' });
                }
            }
            else {
                return next(new http_error_1.HTTPError(401, 'в запросе должен быть файл'));
            }
        });
    }
};
MailController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.MailService)),
    __metadata("design:paramtypes", [Object, Object, Mail_service_1.MailService])
], MailController);
exports.MailController = MailController;
//# sourceMappingURL=Mail.controller.js.map