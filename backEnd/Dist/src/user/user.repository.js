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
exports.UserRepository = void 0;
const prisma_service_1 = require("../database/prisma.service");
const inversify_1 = require("inversify");
const types_1 = require("../types");
let UserRepository = class UserRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    createUser({ email, login, hashpassword }) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkExist = yield this.prismaService.client.userModel.findUnique({
                where: {
                    login,
                },
            });
            const checkExistEmail = yield this.prismaService.client.userModel.findUnique({
                where: {
                    email,
                },
            });
            if (checkExist || checkExistEmail) {
                return null;
            }
            return this.prismaService.client.userModel.create({
                data: {
                    isActive: false,
                    email,
                    login,
                    hashpassword,
                },
            });
        });
    }
    updateAvatar(avatar, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.userModel.update({
                where: {
                    id,
                },
                data: {
                    avatar,
                },
            });
        });
    }
    getBasketByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.basket.findMany({
                where: {
                    userId,
                },
                include: {
                    product: {
                        include: {
                            brand: true,
                            modelDevice: true,
                        },
                    },
                },
            });
        });
    }
    find(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.userModel.findUnique({
                where: {
                    email,
                },
                include: {
                    Comment: true,
                    basket: true,
                    rating: true,
                    address: true,
                },
            });
        });
    }
    findProfile(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.userModel.findFirst({
                where: {
                    login,
                },
                include: {
                    Comment: true,
                },
            });
        });
    }
    getProfileInfoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.userModel.findFirst({
                where: {
                    id,
                },
                include: {
                    Comment: true,
                },
            });
        });
    }
    checkActiveUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.userModel.findFirst({
                where: {
                    email,
                    isActive: true,
                },
            });
        });
    }
    verifyEmail(verifyEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkActive = yield this.checkActiveUser(verifyEmail.email);
            const findUser = yield this.find(verifyEmail.email);
            if (checkActive) {
                return null;
            }
            else {
                if (!findUser) {
                    throw new Error('failed');
                }
                const verify = findUser.id.slice(0, 4);
                return this.prismaService.client.userModel.update({
                    where: { email: findUser.email },
                    data: {
                        isActive: true,
                    },
                });
            }
        });
    }
    deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.comment.delete({
                where: {
                    id: commentId,
                },
            });
        });
    }
    createAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.address.create({
                data: Object.assign({}, address),
            });
        });
    }
    editAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = address, addressUser = __rest(address, ["userId"]);
            return this.prismaService.client.address.update({
                where: {
                    userId,
                },
                data: Object.assign({}, addressUser),
            });
        });
    }
    editProfileInfo(info, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = info, inf = __rest(info, ["password"]);
            return this.prismaService.client.userModel.update({
                where: {
                    id,
                },
                data: Object.assign({}, inf),
            });
        });
    }
};
UserRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.PrismaService)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map