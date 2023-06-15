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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("./types");
const user_controller_1 = require("./user/user.controller");
const body_parser_1 = require("body-parser");
const prisma_service_1 = require("./database/prisma.service");
const auth_middleware_1 = require("./common/auth.middleware");
const product_controller_1 = require("./Product/product.controller");
const userAbility_repository_1 = require("./userAbility/userAbility.repository");
const userAbility_controller_1 = require("./userAbility/userAbility.controller");
const cors_1 = __importDefault(require("cors"));
const admin_controller_1 = require("./adminAbility/admin.controller");
const admin_service_1 = require("./adminAbility/admin.service");
const admin_repository_1 = require("./adminAbility/admin.repository");
const cryptomus_service_1 = require("./cryptomus/cryptomus.service");
const cron_service_1 = require("./cront/cron.service");
const cron_repository_1 = require("./cront/cron.repository");
const buying_controller_1 = require("./buyProduct/buying.controller");
const Mail_controller_1 = require("./Mail/Mail.controller");
let App = class App {
    constructor(logger, exception, userController, configService, prismaService, userRepository, ProductRepository, productController, userAbilityRepository, UserAbility, adminController, adminService, adminRepository, cryptomusService, cronService, cronRepository, buyProductController, mailController) {
        this.logger = logger;
        this.exception = exception;
        this.userController = userController;
        this.configService = configService;
        this.prismaService = prismaService;
        this.userRepository = userRepository;
        this.ProductRepository = ProductRepository;
        this.productController = productController;
        this.userAbilityRepository = userAbilityRepository;
        this.UserAbility = UserAbility;
        this.adminController = adminController;
        this.adminService = adminService;
        this.adminRepository = adminRepository;
        this.cryptomusService = cryptomusService;
        this.cronService = cronService;
        this.cronRepository = cronRepository;
        this.buyProductController = buyProductController;
        this.mailController = mailController;
        this.app = (0, express_1.default)();
        this.port = 8000;
    }
    useExceptionFilter() {
        this.app.use(this.exception.catch.bind(this.exception));
    }
    useMiddleWares() {
        this.app.use((0, body_parser_1.json)());
        this.app.use((0, cors_1.default)({
            origin: 'http://95.163.241.148:4173',
            optionsSuccessStatus: 200,
        }));
        this.app.use((0, body_parser_1.urlencoded)({ extended: true }));
        this.app.use(express_1.default.static('uploads'));
        this.app.use(express_1.default.static(__dirname));
        const authMiddleWare = new auth_middleware_1.AuthMiddleware(this.configService.get('SECRET'));
        this.app.use(authMiddleWare.execute.bind(authMiddleWare));
    }
    useRoutes() {
        this.app.use('/users', this.userController.router);
        this.app.use('/product', this.productController.router);
        this.app.use('/product', this.UserAbility.router);
        this.app.use('/admin', this.adminController.router);
        this.app.use('/buy', this.buyProductController.router);
        this.app.use('/email', this.mailController.router);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.useMiddleWares();
            this.useRoutes();
            this.useExceptionFilter();
            yield this.prismaService.connect();
            this.server = this.app.listen(this.port);
            this.logger.log(`Сервер запущен localhost на порту:${this.port}`);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.close();
        });
    }
};
App = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ExceptionFilter)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.UserController)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.PrismaService)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.UserRepository)),
    __param(6, (0, inversify_1.inject)(types_1.TYPES.ProductRepository)),
    __param(7, (0, inversify_1.inject)(types_1.TYPES.ProductController)),
    __param(8, (0, inversify_1.inject)(types_1.TYPES.UserAbilityRepository)),
    __param(9, (0, inversify_1.inject)(types_1.TYPES.userAbility)),
    __param(10, (0, inversify_1.inject)(types_1.TYPES.AdminController)),
    __param(11, (0, inversify_1.inject)(types_1.TYPES.AdminService)),
    __param(12, (0, inversify_1.inject)(types_1.TYPES.AdminRepository)),
    __param(13, (0, inversify_1.inject)(types_1.TYPES.CryptomusService)),
    __param(14, (0, inversify_1.inject)(types_1.TYPES.CronService)),
    __param(15, (0, inversify_1.inject)(types_1.TYPES.CronRepository)),
    __param(16, (0, inversify_1.inject)(types_1.TYPES.BuyProductController)),
    __param(17, (0, inversify_1.inject)(types_1.TYPES.MailController)),
    __metadata("design:paramtypes", [Object, Object, user_controller_1.UserController, Object, prisma_service_1.PrismaService, Object, Object, product_controller_1.ProductController,
        userAbility_repository_1.UserAbilityRepository,
        userAbility_controller_1.userAbility,
        admin_controller_1.AdminController,
        admin_service_1.AdminService,
        admin_repository_1.AdminRepository,
        cryptomus_service_1.CryptomusService,
        cron_service_1.CronService,
        cron_repository_1.CronRepository,
        buying_controller_1.buying,
        Mail_controller_1.MailController])
], App);
exports.App = App;
//# sourceMappingURL=app.js.map