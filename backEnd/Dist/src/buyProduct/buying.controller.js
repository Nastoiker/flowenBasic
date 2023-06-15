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
exports.buying = void 0;
const inversify_1 = require("inversify");
const base_controller_1 = require("../common/base.controller");
const types_1 = require("../types");
const user_service_1 = require("../user/user.service");
const userAbility_service_1 = require("../userAbility/userAbility.service");
const Auth_guard_1 = require("../common/Auth.guard");
const http_error_1 = require("../errors/http-error");
const buying_service_1 = require("./buying.service");
const cron_service_1 = require("../cront/cron.service");
let buying = class buying extends base_controller_1.BaseController {
    constructor(configService, productService, userService, loggerService, userAbilityService, cryptomusService, buyingService, cronService) {
        super(loggerService);
        this.configService = configService;
        this.productService = productService;
        this.userService = userService;
        this.loggerService = loggerService;
        this.userAbilityService = userAbilityService;
        this.cryptomusService = cryptomusService;
        this.buyingService = buyingService;
        this.cronService = cronService;
        this.bindRoutes([
            {
                path: '/buy',
                method: 'post',
                func: this.buyingProduct,
                middlewares: [new Auth_guard_1.AuthGuard()],
            },
        ]);
    }
    buyingProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const writtenById = yield this.userService.getUserInfo(req.user);
            if (!writtenById) {
                return next(new http_error_1.HTTPError(422, 'Ошибка получения пользователя '));
            }
            const basket = [];
            for (const id of req.body.basketId) {
                let product = yield this.buyingService.getBasketProduct(id);
                if (!product) {
                    continue;
                }
                product = product['product']['price'] * product['product']['quantity'];
                basket.push(product);
            }
            const sum = basket.reduce((a, b) => a + b, 0);
            const payment = yield this.cryptomusService.createPayment(sum, req.body.basketId.join(''));
            if (!payment) {
                return next(new http_error_1.HTTPError(400, 'Ошибка создания оплаты '));
            }
            yield this.buyingService.createPayment(payment.result.uuid, payment.result.order_id, payment.result.status, payment.result.amount, payment.result.is_final, writtenById.id);
            this.ok(res, { message: payment.result.url });
            yield this.cronService.init();
        });
    }
};
buying = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ProductService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.UserService)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.UserAbilityService)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.CryptomusService)),
    __param(6, (0, inversify_1.inject)(types_1.TYPES.BuyingService)),
    __param(7, (0, inversify_1.inject)(types_1.TYPES.CronService)),
    __metadata("design:paramtypes", [Object, Object, user_service_1.UserService, Object, userAbility_service_1.UserAbilityService, Object, buying_service_1.BuyingService,
        cron_service_1.CronService])
], buying);
exports.buying = buying;
//# sourceMappingURL=buying.controller.js.map