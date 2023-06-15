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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
const google_auth_library_1 = require("google-auth-library");
const Multer_middleware_1 = require("../common/Multer.middleware");
const mfile_class_1 = require("../files/mfile.class");
const file_service_1 = require("../files/file.service");
const Mail_service_1 = require("../Mail/Mail.service");
let UserController = class UserController extends base_controller_1.BaseController {
    constructor(loggerService, userService, configService, fileService, emailService) {
        super(loggerService);
        this.loggerService = loggerService;
        this.userService = userService;
        this.configService = configService;
        this.fileService = fileService;
        this.emailService = emailService;
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                func: this.register,
                middlewares: [new validate_middleware_1.ValidateMiddleware(user_register_dto_1.UserRegisterDto)],
            },
            {
                path: '/verify',
                method: 'post',
                func: this.verifyEmail,
                middlewares: [],
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
            {
                path: '/profile:id',
                method: 'get',
                func: this.profileInfo,
                middlewares: [],
            },
            {
                path: '/updateAvatar',
                method: 'post',
                func: this.updateAvatar,
                middlewares: [new Auth_guard_1.AuthGuard(), new Multer_middleware_1.MulterMiddleware()],
            },
            {
                path: '/acc:id',
                method: 'get',
                func: this.acc,
                middlewares: [],
            },
            {
                path: '/authorAuthorization',
                method: 'get',
                func: this.authorAuthorization,
                middlewares: [new Auth_guard_1.AuthGuard()],
            },
            {
                path: '/editAddress',
                method: 'post',
                func: this.editAddress,
                middlewares: [new Auth_guard_1.AuthGuard()],
            },
            {
                path: '/createAddress',
                method: 'post',
                func: this.createAddress,
                middlewares: [new Auth_guard_1.AuthGuard()],
            },
            {
                path: '/editProfileInfo',
                method: 'post',
                func: this.editProfileInfo,
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
            else {
                this.ok(res, { email: result === null || result === void 0 ? void 0 : result.email, id: result === null || result === void 0 ? void 0 : result.id });
                yield this.emailService.sendActivateEmail(result === null || result === void 0 ? void 0 : result.email, result === null || result === void 0 ? void 0 : result.id);
            }
        });
    }
    verifyEmail({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const getInfoProfile = yield this.userService.verifyEmail(body);
            this.ok(res, Object.assign({}, getInfoProfile));
        });
    }
    loginByGoogle({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new google_auth_library_1.OAuth2Client(body.CLIENT_ID);
            const ticket = yield client.verifyIdToken({
                idToken: body.token,
                audience: body.CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload) {
                return next(new http_error_1.HTTPError(401, 'ошибка авторизации', 'login'));
            }
            const email = payload['email'];
            const jwt = yield this.jwtSign(email !== null && email !== void 0 ? email : '', this.configService.get('SECRET'));
            this.ok(res, { jwt });
        });
    }
    login({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkDbUser = yield this.userService.validateUser(body);
            if (!checkDbUser) {
                return next(new http_error_1.HTTPError(401, 'ошибка авторизации', 'login'));
            }
            const userModel = (yield this.userService.getUserInfo(body.email));
            if (!userModel.isActive) {
                yield this.emailService.sendActivateEmail(userModel.email, userModel.id);
                return next(new http_error_1.HTTPError(401, 'подтвердите почту', 'login'));
            }
            const jwt = yield this.jwtSign(body.email, this.configService.get('SECRET'));
            this.ok(res, { jwt });
        });
    }
    info({ user }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = yield this.userService.getUserInfo(user).then((result) => {
                if (result) {
                    const { hashpassword } = result, userInfo = __rest(result, ["hashpassword"]);
                    this.ok(res, Object.assign({}, userInfo));
                }
            });
        });
    }
    acc(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const getInfoProfile = yield this.userService.getProfileInfoById(request.params['id'].slice(1));
            this.ok(res, Object.assign({}, getInfoProfile));
        });
    }
    profileInfo(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const getInfoProfile = yield this.userService.getProfileInfo(request.params['id'].slice(1));
            this.ok(res, Object.assign({}, getInfoProfile));
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
    editAddress(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield this.userService.getUserInfo(request.user);
            if (!userId) {
                return next(new http_error_1.HTTPError(401, 'Файл должен быть фотографией'));
            }
            request.body.userId = userId.id;
            const address = yield this.userService.editAddress(request.body);
            this.ok(res, { address });
        });
    }
    createAddress(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield this.userService.getUserInfo(request.user);
            if (!userId) {
                return next(new http_error_1.HTTPError(401, 'Файл должен быть фотографией'));
            }
            request.body.userId = userId.id;
            const address = yield this.userService.createAddress(request.body);
            this.ok(res, { address });
        });
    }
    updateAvatar(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const writtenById = yield this.userService.getUserInfo(request.user);
            if (request.file) {
                if (!request.file.mimetype.includes('image')) {
                    return next(new http_error_1.HTTPError(401, 'Файл должен быть фотографией'));
                }
                const buffer = yield this.fileService.convertToWebp(request.file.buffer);
                const file = new mfile_class_1.MFile({
                    originalname: `${request.file.originalname.split('.')[0]}.webp`,
                    buffer,
                });
                const upload = yield this.userService.saveAvatar(file, writtenById.id);
                if (!upload) {
                    return next(new http_error_1.HTTPError(401, 'Ошибка добавления аватара'));
                }
                this.ok(res, { mess: 'фото было обновлено с id', id: request.file.originalname });
            }
            else {
                return next(new http_error_1.HTTPError(401, 'Ошибка фото'));
            }
        });
    }
    authorAuthorization(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const writtenById = yield this.userService.getUserInfo(request.user);
            if (!writtenById) {
                return next(new http_error_1.HTTPError(401, 'Ошибка входа'));
            }
            const { hashpassword } = writtenById, user = __rest(writtenById, ["hashpassword"]);
            this.ok(res, Object.assign({}, user));
        });
    }
    editProfileInfo(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const writtenById = yield this.userService.getUserInfo(request.user);
            if (!writtenById) {
                return next(new http_error_1.HTTPError(401, 'Ошибка входа'));
            }
            const result = yield this.userService.editProfileInfo(writtenById.email, request.body, writtenById.id);
            if (!result)
                return next(new http_error_1.HTTPError(401, 'Ошибка редактирования'));
            this.ok(res, Object.assign({}, result));
        });
    }
};
UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UserService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.FileService)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.MailService)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService, Object, file_service_1.FileService,
        Mail_service_1.MailService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map