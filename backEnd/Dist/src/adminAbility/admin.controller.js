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
exports.AdminController = void 0;
const inversify_1 = require("inversify");
const base_controller_1 = require("../common/base.controller");
const types_1 = require("../types");
const user_service_1 = require("../user/user.service");
const userAbility_service_1 = require("../userAbility/userAbility.service");
const admin_guard_1 = require("../common/admin.guard");
const admin_service_1 = require("./admin.service");
const http_error_1 = require("../errors/http-error");
let AdminController = class AdminController extends base_controller_1.BaseController {
    constructor(configService, productService, userService, loggerService, userAbilityService, adminService) {
        super(loggerService);
        this.configService = configService;
        this.productService = productService;
        this.userService = userService;
        this.loggerService = loggerService;
        this.userAbilityService = userAbilityService;
        this.adminService = adminService;
        this.bindRoutes([
            {
                path: '/deleteModel',
                method: 'delete',
                func: this.deleteModel,
                middlewares: [new admin_guard_1.AdminGuard()],
            },
            {
                path: '/deleteComment',
                method: 'delete',
                func: this.deleteComment,
                middlewares: [new admin_guard_1.AdminGuard()],
            },
            {
                path: '/users',
                method: 'get',
                func: this.users,
                middlewares: [],
            },
            {
                path: '/deleteCategory',
                method: 'delete',
                func: this.deleteCategory,
                middlewares: [new admin_guard_1.AdminGuard()],
            },
            {
                path: '/deleteSecondCategory',
                method: 'delete',
                func: this.deleteSecondCategory,
                middlewares: [new admin_guard_1.AdminGuard()],
            },
            {
                path: '/deleteUser',
                method: 'delete',
                func: this.deleteUser,
                middlewares: [new admin_guard_1.AdminGuard()],
            },
        ]);
    }
    deleteModel({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteProduct = yield this.adminService.deleteModel(body.id);
            if (!deleteProduct) {
                return next(new http_error_1.HTTPError(401, 'Ошибка создания продукта'));
            }
            this.ok(res, Object.assign({}, deleteProduct));
        });
    }
    deleteSecondCategory({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteProduct = yield this.adminService.deleteSecondCategory(body.id);
            if (!deleteProduct) {
                return next(new http_error_1.HTTPError(401, 'Ошибка создания продукта'));
            }
            this.ok(res, Object.assign({}, deleteProduct));
        });
    }
    deleteUser({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteProduct = yield this.adminService.deleteUser(body.id);
            if (!deleteProduct) {
                return next(new http_error_1.HTTPError(401, 'Ошибка создания продукта'));
            }
            this.ok(res, Object.assign({}, deleteProduct));
        });
    }
    users(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteProduct = yield this.adminService.users();
            this.arr(res, deleteProduct);
        });
    }
    deleteCategory({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteProduct = yield this.adminService.deleteCategory(body.id);
            if (!deleteProduct) {
                return next(new http_error_1.HTTPError(401, 'Ошибка удаления  категории'));
            }
            this.ok(res, Object.assign({}, deleteProduct));
        });
    }
    deleteTagFromProduct({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteProduct = yield this.adminService.deleteTagFromProduct(body.productId, body.TagId);
            if (!deleteProduct) {
                return next(new http_error_1.HTTPError(401, 'Ошибка обновления тега продукта'));
            }
            this.ok(res, Object.assign({}, deleteProduct));
        });
    }
    deleteComment({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteComment = yield this.adminService.deleteComment(body.commentId);
            if (!deleteComment) {
                return next(new http_error_1.HTTPError(401, 'Ошибка удаления комментария'));
            }
            this.ok(res, Object.assign({}, deleteComment));
        });
    }
};
AdminController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ProductService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.UserService)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.UserAbilityService)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.AdminService)),
    __metadata("design:paramtypes", [Object, Object, user_service_1.UserService, Object, userAbility_service_1.UserAbilityService,
        admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map