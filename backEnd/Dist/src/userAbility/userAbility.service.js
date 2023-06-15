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
exports.UserAbilityService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const product_repository_1 = require("../Product/product.repository");
const userAbility_repository_1 = require("./userAbility.repository");
const fs_extra_1 = require("fs-extra");
const fs_1 = require("fs");
const app_root_path_1 = require("app-root-path");
let UserAbilityService = class UserAbilityService {
    constructor(configService, userRepository, productRepository, userAbilityServiceRepository) {
        this.configService = configService;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.userAbilityServiceRepository = userAbilityServiceRepository;
    }
    deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.deleteComment(commentId);
        });
    }
    setComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!comment.file) {
                return this.productRepository.setCommentProduct(comment.comment, comment.writtenById, comment.modelDeviceId, comment.title, '');
            }
            const model = yield this.productRepository.findModelById(comment.modelDeviceId);
            if (!model) {
                return null;
            }
            const brandName = model['brand']['name'];
            const modelDeviceName = model.name.trim().replace(' ', '-');
            if (!(0, fs_extra_1.pathExistsSync)(`./uploads/comment/${brandName}`)) {
                (0, fs_1.mkdir)(`./uploads/comment/${brandName}`, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            if (!(0, fs_extra_1.pathExistsSync)(`./uploads/comment/${brandName}/${modelDeviceName}`)) {
                (0, fs_1.mkdir)(`./uploads/comment/${brandName}/${modelDeviceName}`, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            if (!(0, fs_extra_1.pathExistsSync)(`./uploads/comment/${brandName}/${modelDeviceName}/${comment.writtenById}`)) {
                (0, fs_1.mkdir)(`./uploads/comment/${brandName}/${modelDeviceName}/${comment.writtenById}`, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            const upload = `${app_root_path_1.path}/uploads/comment`;
            const res = [];
            let images = '';
            for (const file of comment.file) {
                yield (0, fs_extra_1.access)(`${upload}/${brandName}/${modelDeviceName}/${comment.writtenById}/${file.originalname}`, (err) => {
                    (0, fs_extra_1.writeFile)(`${upload}/${brandName}/${modelDeviceName}/${comment.writtenById}/${file.originalname}`, file.buffer);
                });
                res.push({
                    url: `${upload}/${brandName}/${modelDeviceName}/${comment.writtenById}/${comment.title}`,
                    name: file.originalname,
                });
                if (images.length > 0) {
                    images.concat(`/${file.originalname.split('.')[0]}.webp`);
                }
                else {
                    images = `${file.originalname.split('.')[0]}.webp`;
                }
            }
            return this.productRepository.setCommentProduct(comment.comment, comment.writtenById, comment.modelDeviceId, comment.title, images);
        });
    }
    addBasket(productId, userId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.addProductToBasket(productId, userId, quantity, false);
        });
    }
    getBasketUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getBasketByUser(userId);
        });
    }
    getUserInfo(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find(user);
        });
    }
    setRatingProduct(rating) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.setRating(rating);
        });
    }
    deleteBasket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userAbilityServiceRepository.deleteProductToBasket(id);
        });
    }
    editQuantityBasketProduct(id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userAbilityServiceRepository.editQuantityBasketProduct(id, quantity);
        });
    }
    updateProductToBasket(basket) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userAbilityServiceRepository.updateProductToBasket(basket);
        });
    }
};
UserAbilityService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UserRepository)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ProductRepository)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.UserAbilityRepository)),
    __metadata("design:paramtypes", [Object, Object, product_repository_1.ProductRepository,
        userAbility_repository_1.UserAbilityRepository])
], UserAbilityService);
exports.UserAbilityService = UserAbilityService;
//# sourceMappingURL=userAbility.service.js.map