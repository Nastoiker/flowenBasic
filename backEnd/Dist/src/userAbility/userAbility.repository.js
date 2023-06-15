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
exports.UserAbilityRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const prisma_service_1 = require("../database/prisma.service");
let UserAbilityRepository = class UserAbilityRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    setCommentProduct(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.comment.create({
                data: Object.assign({}, comment),
                include: {
                    model: true,
                    writtenBy: true,
                },
            });
        });
    }
    deleteProductToBasket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.basket.delete({
                where: {
                    id,
                },
            });
        });
    }
    editQuantityBasketProduct(id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.basket.update({
                where: {
                    id,
                },
                data: {
                    quantity,
                },
            });
        });
    }
    updateProductToBasket({ id, buying, quantity, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.basket.update({
                where: {
                    id,
                },
                data: {
                    buying,
                    quantity,
                },
            });
        });
    }
    addProductToBasket(productId, userId, quantity, buying) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.client.basket.create({
                data: {
                    productId,
                    userId,
                    quantity,
                    buying,
                },
            });
        });
    }
};
UserAbilityRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.PrismaService)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserAbilityRepository);
exports.UserAbilityRepository = UserAbilityRepository;
//# sourceMappingURL=userAbility.repository.js.map