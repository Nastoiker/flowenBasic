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
exports.userAbility = void 0;
const base_controller_1 = require("../common/base.controller");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const http_error_1 = require("../errors/http-error");
const user_service_1 = require("../user/user.service");
const userAbility_service_1 = require("./userAbility.service");
const Auth_guard_1 = require("../common/Auth.guard");
const mfile_class_1 = require("../files/mfile.class");
const file_service_1 = require("../files/file.service");
const Multer_middleware_1 = require("../common/Multer.middleware");
let userAbility = class userAbility extends base_controller_1.BaseController {
    constructor(configService, productService, userService, loggerService, userAbilityService, fileService) {
        super(loggerService);
        this.configService = configService;
        this.productService = productService;
        this.userService = userService;
        this.loggerService = loggerService;
        this.userAbilityService = userAbilityService;
        this.fileService = fileService;
        this.bindRoutes([
            {
                path: '/info:id',
                method: 'post',
                func: this.productBuyUser,
                middlewares: [new Auth_guard_1.AuthGuard()],
            },
            {
                path: '/addBasket',
                method: 'post',
                func: this.addProductToBasket,
                middlewares: [new Auth_guard_1.AuthGuard()],
            },
            {
                path: '/deleteBasket',
                method: 'post',
                func: this.deleteProductToBasket,
                middlewares: [new Auth_guard_1.AuthGuard()],
            },
            {
                path: '/getBasket',
                method: 'get',
                func: this.getBasketUser,
                middlewares: [new Auth_guard_1.AuthGuard()],
            },
            {
                path: '/comment',
                method: 'post',
                func: this.setComment,
                middlewares: [new Multer_middleware_1.MulterMiddleware(), new Auth_guard_1.AuthGuard()],
            },
            {
                path: '/setRating',
                method: 'post',
                func: this.setRatingProduct,
                middlewares: [new Auth_guard_1.AuthGuard()],
            },
            {
                path: '/updateBasket',
                method: 'post',
                func: this.updateProductToBasket,
                middlewares: [new Auth_guard_1.AuthGuard()],
            },
            {
                path: '/editQuantityBasketProduct',
                method: 'post',
                func: this.editQuantityBasketProduct,
                middlewares: [new Auth_guard_1.AuthGuard()],
            },
            {
                path: '/deleteComment',
                method: 'post',
                func: this.deleteComment,
                middlewares: [new Auth_guard_1.AuthGuard()],
            },
        ]);
    }
    productBuyUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const writtenById = yield this.userService.getUserInfo(req.user);
            const productId = yield this.productService.find(req.body.productId);
            if (!productId || !writtenById) {
                next(new http_error_1.HTTPError(422, 'не найдены ids'));
            }
            else {
                const product = Object.assign(Object.assign({}, req.body), { writtenById: writtenById.id, modelDeviceId: productId.id, pictures: req.body.pictures });
                const result = yield this.userAbilityService.setComment(product);
                if (!result) {
                    next(new http_error_1.HTTPError(422, 'Ошибка создания коммента '));
                }
                this.ok(res, { mes: 'Ваш комментарий оставлен' });
            }
        });
    }
    editQuantityBasketProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const writtenById = yield this.userService.getUserInfo(req.user);
            if (!writtenById) {
                return next(new http_error_1.HTTPError(422, 'Ошибка добавления товара в корзину'));
            }
            const edited = yield this.userAbilityService.editQuantityBasketProduct(req.body.basketId, req.body.quantity);
            this.ok(res, { edited });
        });
    }
    addProductToBasket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const writtenById = yield this.userService.getUserInfo(req.user);
            if (!writtenById) {
                return next(new http_error_1.HTTPError(422, 'Вы не авторизованы'));
            }
            const basket = yield this.userAbilityService.addBasket(req.body.productId, writtenById.id, req.body.quantity);
            if (!basket) {
                return next(new http_error_1.HTTPError(422, 'Ошибка добавления товара в корзину'));
            }
            this.ok(res, Object.assign({}, basket));
        });
    }
    deleteProductToBasket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const writtenById = yield this.userService.getUserInfo(req.user);
            if (!writtenById) {
                return next(new http_error_1.HTTPError(422, 'Ошибка регистрации'));
            }
            yield this.userAbilityService.deleteBasket(req.body.id);
            this.ok(res, { message: 'deletedBasket' });
        });
    }
    setComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const writtenById = yield this.userService.getUserInfo(req.user);
            if (!writtenById) {
                return next(new http_error_1.HTTPError(422, 'Ошибка создания коммента '));
            }
            if (!req.file) {
                yield this.userAbilityService.setComment({
                    comment: req.body.comment,
                    modelDeviceId: req.body.modelDeviceId,
                    writtenById: writtenById.id,
                    title: req.body.title,
                });
                return this.ok(res, { message: 'Коммент оставлен' });
            }
            const savearray = [new mfile_class_1.MFile(req.file)];
            const buffer = yield this.fileService.convertToWebp(req.file.buffer);
            savearray.push(new mfile_class_1.MFile({
                originalname: `${req.file.originalname.split('.')[0]}.webp`,
                buffer,
            }));
            yield this.userAbilityService.setComment({
                comment: req.body.comment,
                modelDeviceId: req.body.modelDeviceId,
                writtenById: writtenById.id,
                title: req.body.title,
                file: savearray,
            });
            this.ok(res, { message: 'Коммент оставлен' });
        });
    }
    deleteComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const writtenById = yield this.userService.getUserInfo(req.user);
            if (!writtenById) {
                return next(new http_error_1.HTTPError(422, 'Ошибка рейтинга '));
            }
            const deleteComment = yield this.userAbilityService.deleteComment(req.body.commentId);
            this.ok(res, { message: 'Коммент удален' });
        });
    }
    setRatingProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const writtenById = yield this.userService.getUserInfo(req.user);
            if (!writtenById) {
                return next(new http_error_1.HTTPError(422, 'Ошибка рейтинга '));
            }
            const rating = yield this.userAbilityService.setRatingProduct({
                modelDeviceId: req.body.productId,
                writtenById: writtenById.id,
                number: req.body.quantity,
            });
            this.ok(res, { rating });
        });
    }
    updateProductToBasket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const writtenById = yield this.userService.getUserInfo(req.user);
            if (!writtenById) {
                next(new http_error_1.HTTPError(422, 'Ошибка получения корзины '));
            }
            else {
                const update = yield this.userAbilityService.updateProductToBasket(req.body);
                this.ok(res, { update });
            }
        });
    }
    getBasketUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield this.userService.getUserInfo(req.user);
            if (!userId) {
                next(new http_error_1.HTTPError(422, 'Ошибка получения корзины '));
            }
            else {
                const basket = yield this.userAbilityService.getBasketUser(userId.id);
                this.ok(res, basket);
            }
        });
    }
};
userAbility = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ProductService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.UserService)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.UserAbilityService)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.FileService)),
    __metadata("design:paramtypes", [Object, Object, user_service_1.UserService, Object, userAbility_service_1.UserAbilityService,
        file_service_1.FileService])
], userAbility);
exports.userAbility = userAbility;
//# sourceMappingURL=userAbility.controller.js.map