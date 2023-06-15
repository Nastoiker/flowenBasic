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
const appContainerBinding = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.LoggerService).to(Logger_1.LoggerService).inSingletonScope();
    bind(types_1.TYPES.ExceptionFilter).to(exeption_filtes_1.ExceptionFilter).inSingletonScope();
    bind(types_1.TYPES.UserController).to(user_controller_1.UserController).inSingletonScope();
    bind(types_1.TYPES.UserService).to(user_service_1.UserService).inSingletonScope();
    bind(types_1.TYPES.ConfigService).to(config_service_1.ConfigService).inSingletonScope();
    bind(types_1.TYPES.PrismaService).to(prisma_service_1.PrismaService).inSingletonScope();
    bind(types_1.TYPES.UserRepository).to(user_repository_1.UserRepository).inSingletonScope();
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