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
exports.UserService = void 0;
const user_entity_1 = require("./user.entity");
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../types");
let UserService = class UserService {
    constructor(configService, userRepository) {
        this.configService = configService;
        this.userRepository = userRepository;
    }
    validateUser({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateUSer = yield this.userRepository.find(email);
            if (!validateUSer) {
                return false;
            }
            const newUser = new user_entity_1.User(email, validateUSer.login, validateUSer.password);
            return newUser.comparePassword(password);
        });
    }
    createUser({ email, login, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_entity_1.User(email, login);
            const checkDB = yield this.userRepository.find(email);
            if (checkDB) {
                return null;
            }
            const salt = this.configService.get('SALT');
            yield newUser.setPassword(password, Number(salt));
            return this.userRepository.createUser(newUser);
        });
    }
    getUserInfo(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user) {
                console.log(2);
                return null;
            }
            return this.userRepository.find(user);
        });
    }
};
UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UserRepository)),
    __metadata("design:paramtypes", [Object, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map