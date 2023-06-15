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
exports.ProductService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const product_repository_1 = require("./product.repository");
const fs_extra_1 = require("fs-extra");
const app_root_path_1 = require("app-root-path");
const fs_1 = require("fs");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    findLikeSqlModelBrand(searchByWorld) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.findLikeSqlModelBrand(searchByWorld);
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.productRepository.findProduct(product.name)) {
                return null;
            }
            const checkProduct = yield this.getModelBrandId(product);
            return this.productRepository.createProduct(checkProduct);
        });
    }
    createModel(model) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.productRepository.findProduct(model.name)) {
                return null;
            }
            return this.productRepository.createModel(model);
        });
    }
    createBrand(file, brand) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.productRepository.findBrand(brand.name)) {
                return null;
            }
            const extension = file.originalname.split('.');
            yield (0, fs_extra_1.writeFile)(`${app_root_path_1.path}/uploads/brands/${brand.name}.${extension[extension.length - 1]}`, file.buffer);
            brand.img = `/uploads/brands/${brand.name}.${extension[extension.length - 1]}`;
            return this.productRepository.createBrand(brand);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.deleteProduct(id);
        });
    }
    findByAlias(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.findByAlias(alias);
        });
    }
    find(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.findProduct(name);
        });
    }
    findProducts(brandId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.findProducts(brandId);
        });
    }
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.productRepository.findProduct(product.name);
            if (!id) {
                return null;
            }
            return this.productRepository.updateProduct(id.id, product);
        });
    }
    getModelBrandId(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const brandId = yield this.productRepository.findBrandByName(product.brandId);
            const modelId = yield this.productRepository.findModelByName(product.modelDeviceId);
            const tag = yield this.productRepository.findTagByName(product.TagId);
            return Object.assign(Object.assign({}, product), { brandId: brandId === null || brandId === void 0 ? void 0 : brandId.id, modelDeviceId: modelId === null || modelId === void 0 ? void 0 : modelId.id, TagId: tag === null || tag === void 0 ? void 0 : tag.id });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.getAllProducts();
        });
    }
    getByFirstCategory(firstLevelId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.getProductByCategory(firstLevelId);
        });
    }
    setSecondCategory(name, firstLevelId, alias) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.setSecondCategory(name, firstLevelId, alias);
        });
    }
    saveFile(files, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.getProductById(productId);
            if (!product) {
                return null;
            }
            const brandId = product['brand']['name'];
            const modelDeviceId = product['modelDevice']['name'].trim().replace(' ', '-');
            let image = product.image;
            if (!image) {
                image = '';
            }
            const name = product.name;
            if (!(0, fs_extra_1.pathExistsSync)(`./uploads/product/${brandId}`)) {
                (0, fs_1.mkdir)(`./uploads/product/${brandId}`, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            if (!(0, fs_extra_1.pathExistsSync)(`./uploads/product/${brandId}/${modelDeviceId}`)) {
                (0, fs_1.mkdir)(`./uploads/product/${brandId}/${modelDeviceId}`, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            if (!(0, fs_extra_1.pathExistsSync)(`./uploads/product/${brandId}/${modelDeviceId}/${product.ColorAlias}`)) {
                (0, fs_1.mkdir)(`./uploads/product/${brandId}/${modelDeviceId}/${product.ColorAlias}`, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            const upload = `${app_root_path_1.path}/uploads/product`;
            const res = [];
            let images = '';
            for (const file of files) {
                yield (0, fs_extra_1.access)(`${upload}/${brandId}/${modelDeviceId}/${product.ColorAlias}/${file.originalname}`, (err) => {
                    (0, fs_extra_1.writeFile)(`${upload}/${brandId}/${modelDeviceId}/${product.ColorAlias}/${file.originalname}`, file.buffer);
                });
                res.push({
                    url: `${upload}/${brandId}/${modelDeviceId}/${product.ColorAlias}/${name}`,
                    name: file.originalname,
                });
                if (images.length > 0) {
                    images.concat(`/${file.originalname.split('.')[0]}.webp`);
                }
                else {
                    images = `${file.originalname.split('.')[0]}.webp`;
                }
            }
            return yield this.productRepository.updateByIdPhoto(productId, images + ',' + image);
        });
    }
    getCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.getCategory();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.getProductById(id);
        });
    }
    setBrandOnSecondCategory(setBrandsOnCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.setBrandOnSecondCategory(setBrandsOnCategory);
        });
    }
    setCategoryOnBrand(file, setBrandsOnCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.productRepository.findBrand(setBrandsOnCategory.name)) {
                return null;
            }
            const extension = file.originalname.split('.');
            yield (0, fs_extra_1.writeFile)(`${app_root_path_1.path}/uploads/brands/${setBrandsOnCategory.name}.${extension[extension.length - 1]}`, file.buffer);
            setBrandsOnCategory.img = `/uploads/brands/${setBrandsOnCategory.name}.${extension[extension.length - 1]}`;
            return this.productRepository.setCategoryOnBrand(setBrandsOnCategory);
        });
    }
    getProductByBrandSecondCategory(secondLevelId, brandId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.getProductByBrandSecondCategory(secondLevelId, brandId);
        });
    }
    getBrandProductByCategory(secondLevelId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.getBrandProductByCategory(secondLevelId);
        });
    }
    getBrands() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.getBrands();
        });
    }
    getProductsDiscount() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.getProductsDiscount();
        });
    }
    getTags() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.getTags();
        });
    }
};
ProductService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ProductRepository)),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map