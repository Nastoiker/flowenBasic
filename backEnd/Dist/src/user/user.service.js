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
exports.UserService = void 0;
const user_entity_1 = require("./user.entity");
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../types");
const fs_extra_1 = require("fs-extra");
const app_root_path_1 = require("app-root-path");
const fs_1 = require("fs");
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
            const newUser = new user_entity_1.User(email, validateUSer.login, validateUSer.hashpassword);
            return newUser.comparePassword(password);
        });
    }
    createUser({ email, login, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_entity_1.User(email, login);
            const salt = this.configService.get('SALT');
            yield newUser.setPassword(password, Number(salt));
            return this.userRepository.createUser(newUser);
        });
    }
    getUserInfo(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find(user);
        });
    }
    saveAvatar(file, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, fs_1.existsSync)(`${app_root_path_1.path}/uploads/user/avatar/${userId}`)) {
                (0, fs_1.mkdir)(`./uploads/user/avatar/${userId}`, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                });
            }
            yield (0, fs_extra_1.access)(`${app_root_path_1.path}/uploads/user/avatar/${userId}`, (err) => {
                (0, fs_extra_1.writeFile)(`${app_root_path_1.path}/uploads/user/avatar/${userId}/${file.originalname}`, file.buffer);
            });
            return this.userRepository.updateAvatar(file.originalname, userId);
        });
    }
    getProfileInfo(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findProfile(login).then((res) => {
                if (res) {
                    const { hashpassword, email } = res, profile = __rest(res, ["hashpassword", "email"]);
                    return profile;
                }
            });
        });
    }
    editAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.editAddress(address);
        });
    }
    createAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.createAddress(address);
        });
    }
    getProfileInfoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.getProfileInfoById(id).then((res) => {
                if (res) {
                    const { hashpassword, email } = res, profile = __rest(res, ["hashpassword", "email"]);
                    return profile;
                }
            });
        });
    }
    verifyEmail(verifyUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.verifyEmail(verifyUser);
        });
    }
    editProfileInfo(email, info, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.validateUser({ email, password: info.password });
            if (!check)
                return null;
            const newUser = new user_entity_1.User(email, info.login);
            const salt = this.configService.get('SALT');
            yield newUser.setPassword(info.hashpassword, Number(salt));
            info.hashpassword = newUser.hashpassword;
            return yield this.userRepository.editProfileInfo(info, id);
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