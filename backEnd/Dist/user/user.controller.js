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
exports.UserController = void 0;
const base_controller_1 = require("../common/base.controller");
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../types");
const user_login_dto_1 = require("./dto/user-login.dto");
const user_register_dto_1 = require("./dto/user-register.dto");
const user_service_1 = require("./user.service");
const http_error_1 = require("../errors/http-error");
const validate_middleware_1 = require("../common/validate.middleware");
const jsonwebtoken_1 = require("jsonwebtoken");
const Auth_guard_1 = require("../common/Auth.guard");
let UserController = class UserController extends base_controller_1.BaseController {
    constructor(loggerService, userService, configService) {
        super(loggerService);
        this.loggerService = loggerService;
        this.userService = userService;
        this.configService = configService;
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                func: this.register,
                middlewares: [new validate_middleware_1.ValidateMiddleware(user_register_dto_1.UserRegisterDto)],
            },
            {
                path: '/login',
                method: 'post',
                func: this.login,
                middlewares: [new validate_middleware_1.ValidateMiddleware(user_login_dto_1.UserLoginDto)],
            },
            {
                path: '/info',
                method: 'get',
                func: this.info,
                middlewares: [new Auth_guard_1.AuthGuard()],
            },
        ]);
    }
    register({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userService.createUser(body);
            if (!result) {
                next(new http_error_1.HTTPError(422, 'Ошибка создания пользователя '));
            }
            this.ok(res, { email: result });
        });
    }
    login({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkDbUser = yield this.userService.validateUser(body);
            if (!checkDbUser) {
                return next(new http_error_1.HTTPError(401, 'ошибка авторизации', 'login'));
            }
            const jwt = yield this.jwtSign(body.email, this.configService.get('SECRET'));
            this.ok(res, { jwt });
        });
    }
    info({ user }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield this.userService.getUserInfo(user);
            this.ok(res, { email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email, id: userInfo === null || userInfo === void 0 ? void 0 : userInfo.id });
        });
    }
    jwtSign(email, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                (0, jsonwebtoken_1.sign)({
                    email,
                    iat: Math.floor(Date.now() / 1000),
                }, secret, {
                    algorithm: 'HS256',
                }, (err, token) => {
                    if (err) {
                        reject();
                    }
                    resolve(token);
                });
            });
        });
    }
};
UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UserService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService, Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map