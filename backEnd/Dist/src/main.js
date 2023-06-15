"use strict";
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
exports.boot = void 0;
const app_1 = require("./app");
const Logger_1 = require("./logger/Logger");
const exeption_filtes_1 = require("./errors/exeption.filtes");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const config_service_1 = require("./config/config.service");
const prisma_service_1 = require("./database/prisma.service");
const user_repository_1 = require("./user/user.repository");
const product_controller_1 = require("./Product/product.controller");
const product_repository_1 = require("./Product/product.repository");
const product_service_1 = require("./Product/product.service");
const userAbility_controller_1 = require("./userAbility/userAbility.controller");
const userAbility_service_1 = require("./userAbility/userAbility.service");
const userAbility_repository_1 = require("./userAbility/userAbility.repository");
const file_service_1 = require("./files/file.service");
const admin_service_1 = require("./adminAbility/admin.service");
const admin_repository_1 = require("./adminAbility/admin.repository");
const admin_controller_1 = require("./adminAbility/admin.controller");
const Mail_service_1 = require("./Mail/Mail.service");
const cryptomus_service_1 = require("./cryptomus/cryptomus.service");
const cron_service_1 = require("./cront/cron.service");
const cron_repository_1 = require("./cront/cron.repository");
const buying_service_1 = require("./buyProduct/buying.service");
const buying_controller_1 = require("./buyProduct/buying.controller");
const Mail_controller_1 = require("./Mail/Mail.controller");
const Mail_repository_1 = require("./Mail/Mail.repository");
const appContainerBinding = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.LoggerService).to(Logger_1.LoggerService).inSingletonScope();
    bind(types_1.TYPES.ExceptionFilter).to(exeption_filtes_1.ExceptionFilter).inSingletonScope();
    bind(types_1.TYPES.UserController).to(user_controller_1.UserController).inSingletonScope();
    bind(types_1.TYPES.UserService).to(user_service_1.UserService).inSingletonScope();
    bind(types_1.TYPES.ConfigService).to(config_service_1.ConfigService).inSingletonScope();
    bind(types_1.TYPES.PrismaService).to(prisma_service_1.PrismaService).inSingletonScope();
    bind(types_1.TYPES.UserRepository).to(user_repository_1.UserRepository).inSingletonScope();
    bind(types_1.TYPES.ProductRepository).to(product_repository_1.ProductRepository).inSingletonScope();
    bind(types_1.TYPES.ProductController).to(product_controller_1.ProductController).inSingletonScope();
    bind(types_1.TYPES.ProductService).to(product_service_1.ProductService).inSingletonScope();
    bind(types_1.TYPES.userAbility).to(userAbility_controller_1.userAbility).inSingletonScope();
    bind(types_1.TYPES.UserAbilityService).to(userAbility_service_1.UserAbilityService).inSingletonScope();
    bind(types_1.TYPES.UserAbilityRepository)
        .to(userAbility_repository_1.UserAbilityRepository)
        .inSingletonScope();
    bind(types_1.TYPES.FileService).to(file_service_1.FileService).inSingletonScope();
    bind(types_1.TYPES.AdminService).to(admin_service_1.AdminService).inSingletonScope();
    bind(types_1.TYPES.AdminRepository).to(admin_repository_1.AdminRepository).inSingletonScope();
    bind(types_1.TYPES.AdminController).to(admin_controller_1.AdminController).inSingletonScope();
    bind(types_1.TYPES.MailService).to(Mail_service_1.MailService).inSingletonScope();
    bind(types_1.TYPES.MailController).to(Mail_controller_1.MailController).inSingletonScope();
    bind(types_1.TYPES.CryptomusService).to(cryptomus_service_1.CryptomusService).inSingletonScope();
    bind(types_1.TYPES.CronService).to(cron_service_1.CronService).inSingletonScope();
    bind(types_1.TYPES.CronRepository).to(cron_repository_1.CronRepository).inSingletonScope();
    bind(types_1.TYPES.BuyProductController).to(buying_controller_1.buying).inSingletonScope();
    bind(types_1.TYPES.BuyingService).to(buying_service_1.BuyingService).inSingletonScope();
    bind(types_1.TYPES.MailRepository).to(Mail_repository_1.MailRepository).inSingletonScope();
    bind(types_1.TYPES.Application).to(app_1.App).inSingletonScope();
});
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const appContainer = new inversify_1.Container();
        appContainer.load(appContainerBinding);
        const app = appContainer.get(types_1.TYPES.Application);
        yield app.init();
        return { appContainer, app };
    });
}
exports.boot = bootstrap();
//# sourceMappingURL=main.js.map