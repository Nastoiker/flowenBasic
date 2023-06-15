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
exports.ProductRepository = void 0;
const prisma_service_1 = require("../database/prisma.service");
const inversify_1 = require("inversify");
const types_1 = require("../types");
let ProductRepository = class ProductRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    findLikeSqlModelBrand(searchByWorld) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(searchByWorld);
            return yield this.prismaService.client.product.findMany({
                where: {
                    name: {
                        startsWith: searchByWorld,
                    },
                },
            });
        });
    }
    createProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.product.create({
                data: Object.assign({}, data),
            });
        });
    }
    createModel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.modelDevice.create({
                data: Object.assign({}, data),
            });
        });
    }
    createBrand(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.brand.create({
                data: Object.assign({}, data),
            });
        });
    }
    findProduct(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.product.findFirst({
                where: {
                    name,
                },
            });
        });
    }
    findByAlias(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.product.findFirst({
                where: {
                    alias,
                },
                include: {
                    brand: true,
                    modelDevice: true,
                },
            });
        });
    }
    findBrand(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.brand.findFirst({
                where: {
                    name,
                },
            });
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.client.product.findFirst({
                where: {
                    id,
                },
                include: {
                    brand: true,
                    modelDevice: true,
                },
            });
        });
    }
    findProducts(brandId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.product.findMany({
                where: {
                    brandId,
                },
            });
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.product.delete({
                where: {
                    id,
                },
            });
        });
    }
    getProductByCategory(firstLevelId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.secondLevelCategory.findMany({
                where: {
                    firstLevelId,
                },
            });
        });
    }
    getBrandProductByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.brand.findMany({
                where: {
                    secondLevelCategory: {
                        some: {
                            category: {
                                id: categoryId,
                            },
                        },
                    },
                },
            });
        });
    }
    updateByIdPhoto(id, image) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.product.update({
                where: {
                    id,
                },
                data: {
                    image,
                },
            });
        });
    }
    addProductToBasket(productId, userId, quantity, buying) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkExist = yield this.prismaService.client.product.findUnique({
                where: { id: productId },
            });
            if (!checkExist)
                return null;
            return this.prismaService.client.basket.create({
                data: {
                    productId,
                    userId,
                    quantity,
                    buying,
                },
            });
        });
    }
    updateByIdPrice(id, price) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.product.update({
                where: {
                    id,
                },
                data: {
                    price,
                },
            });
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.product.update({
                where: {
                    id,
                },
                data: Object.assign({}, product),
            });
        });
    }
    findBrandByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.brand.findFirst({
                where: {
                    name,
                },
                include: {
                    Product: true,
                },
            });
        });
    }
    createModelProduct(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.modelDevice.create({
                data: Object.assign({}, model),
            });
        });
    }
    findModelByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.modelDevice.findFirst({
                where: {
                    name,
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
    findModelById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.modelDevice.findFirst({
                where: {
                    id,
                },
                include: {
                    brand: true,
                },
            });
        });
    }
    findTagByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.tag.findFirst({
                where: {
                    name,
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
    getTags() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.tag.findMany({});
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.client.modelDevice.findMany({
                include: {
                    brand: true,
                    Comment: true,
                    rating: true,
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
    setCommentProduct(comment, writtenById, modelDeviceId, title, pictures) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.comment.create({
                data: {
                    comment,
                    modelDeviceId,
                    title,
                    writtenById,
                    pictures,
                },
            });
        });
    }
    setSecondCategory(name, firstLevelId, alias) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.secondLevelCategory.create({
                data: {
                    name,
                    firstLevelId,
                    alias,
                },
                include: {
                    firstLevelCategory: true,
                },
            });
        });
    }
    getCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.firstLevelCategory.findMany({
                include: {
                    secondLevelCategory: true,
                },
            });
        });
    }
    getBrands() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.brand.findMany();
        });
    }
    setRating(rating) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkExistUserRating = yield this.prismaService.client.rating.findMany({
                where: { writtenById: rating.writtenById, modelDeviceId: rating.modelDeviceId },
            });
            if (checkExistUserRating) {
                yield this.prismaService.client.rating.deleteMany({
                    where: { writtenById: rating.writtenById, modelDeviceId: rating.modelDeviceId },
                });
            }
            return this.prismaService.client.rating.create({
                data: rating,
            });
        });
    }
    setBrandOnSecondCategory(setBrandsOnCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            const brands = setBrandsOnCategory.id;
            const setBrands = [];
            for (const brand of brands) {
                setBrands.push({ brand: { connect: { id: brand } } });
            }
            const { name, firstLevelId, alias } = setBrandsOnCategory;
            return yield this.prismaService.client.secondLevelCategory.create({
                data: {
                    name,
                    alias,
                    firstLevelId,
                    brands: {
                        create: [...setBrands],
                    },
                },
            });
        });
    }
    setCategoryOnBrand(setCategoryOnBrand) {
        return __awaiter(this, void 0, void 0, function* () {
            const brands = setCategoryOnBrand.categories;
            const setBrands = [];
            for (const brand of brands) {
                setBrands.push({ category: { connect: { id: brand } } });
            }
            const name = setCategoryOnBrand.name;
            return this.prismaService.client.brand.create({
                data: {
                    name,
                    secondLevelCategory: {
                        create: [...setBrands],
                    },
                },
            });
        });
    }
    getProductByBrandSecondCategory(secondCategoryId, brandId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.client.modelDevice.findMany({
                where: {
                    secondCategoryId,
                    brandId,
                },
                include: {
                    brand: true,
                    Comment: true,
                },
            });
        });
    }
    getProductsDiscount() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.client.product.findMany({
                where: {
                    NOT: [
                        {
                            oldPrice: null,
                        },
                    ],
                },
            });
        });
    }
};
ProductRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.PrismaService)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductRepository);
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map