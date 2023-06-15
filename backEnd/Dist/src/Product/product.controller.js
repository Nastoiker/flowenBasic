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
exports.ProductController = void 0;
const types_1 = require("../types");
const inversify_1 = require("inversify");
const base_controller_1 = require("../common/base.controller");
const create_product_dto_1 = require("./dto/create-product.dto");
const http_error_1 = require("../errors/http-error");
const admin_guard_1 = require("../common/admin.guard");
const validate_middleware_1 = require("../common/validate.middleware");
const mfile_class_1 = require("../files/mfile.class");
const Multer_middleware_1 = require("../common/Multer.middleware");
const file_service_1 = require("../files/file.service");
let ProductController = class ProductController extends base_controller_1.BaseController {
    constructor(configService, productService, loggerService, fileService) {
        super(loggerService);
        this.configService = configService;
        this.productService = productService;
        this.loggerService = loggerService;
        this.fileService = fileService;
        this.bindRoutes([
            {
                path: '/create',
                method: 'post',
                func: this.create,
                middlewares: [new admin_guard_1.AdminGuard(), new validate_middleware_1.ValidateMiddleware(create_product_dto_1.ProductCreate)],
            },
            {
                path: '/delete',
                method: 'delete',
                func: this.delete,
                middlewares: [new admin_guard_1.AdminGuard()],
            },
            {
                path: '/update',
                method: 'patch',
                func: this.updateProduct,
                middlewares: [new admin_guard_1.AdminGuard(), new validate_middleware_1.ValidateMiddleware(create_product_dto_1.ProductUpdate)],
            },
            {
                path: '/info:id',
                method: 'get',
                func: this.find,
                middlewares: [],
            },
            {
                path: '/findByAlias:alias',
                method: 'get',
                func: this.findByAlias,
                middlewares: [],
            },
            {
                path: '',
                method: 'get',
                func: this.getAllProduct,
                middlewares: [],
            },
            {
                path: '/byCategory',
                method: 'post',
                func: this.getByFirstCategoryProducts,
                middlewares: [],
            },
            {
                path: '/setCategory',
                method: 'post',
                func: this.setCategory,
                middlewares: [new admin_guard_1.AdminGuard()],
            },
            {
                path: '/getBySecondCategory',
                method: 'post',
                func: this.getProducts,
                middlewares: [],
            },
            {
                path: '/getCategory',
                method: 'get',
                func: this.getCategory,
                middlewares: [],
            },
            {
                path: '/getFirstCategory',
                method: 'get',
                func: this.getFirstCategory,
                middlewares: [],
            },
            {
                path: '/getProductById:id',
                method: 'get',
                func: this.getFirstCategory,
                middlewares: [],
            },
            {
                path: '/uploadImage',
                method: 'post',
                func: this.uploadImage,
                middlewares: [new admin_guard_1.AdminGuard(), new Multer_middleware_1.MulterMiddleware()],
            },
            {
                path: '/setSecondCategoryBrand',
                method: 'post',
                func: this.setBrandOnSecondCategory,
                middlewares: [new admin_guard_1.AdminGuard()],
            },
            {
                path: '/createModel',
                method: 'post',
                func: this.createModel,
                middlewares: [new admin_guard_1.AdminGuard(), new validate_middleware_1.ValidateMiddleware(create_product_dto_1.ModelDeviceDto)],
            },
            {
                path: '/createBrand',
                method: 'post',
                func: this.createBrand,
                middlewares: [new admin_guard_1.AdminGuard(), new Multer_middleware_1.MulterMiddleware()],
            },
            {
                path: '/setBrandOnSecondCategory',
                method: 'post',
                func: this.setBrandOnSecondCategory,
                middlewares: [new admin_guard_1.AdminGuard()],
            },
            {
                path: '/setCategoryOnBrand',
                method: 'post',
                func: this.setCategoryOnBrand,
                middlewares: [new admin_guard_1.AdminGuard()],
            },
            {
                path: '/getProductByBrandSecondCategory',
                method: 'post',
                func: this.getProductByBrandSecondCategory,
                middlewares: [],
            },
            {
                path: '/getBrands',
                method: 'get',
                func: this.getBrands,
                middlewares: [],
            },
            {
                path: '/getBrandProductByCategory',
                method: 'post',
                func: this.getBrandProductByCategory,
                middlewares: [],
            },
            {
                path: '/getProductsDiscount',
                method: 'get',
                func: this.getProductsDiscount,
                middlewares: [],
            },
            {
                path: '/findLikeSqlModelBrand:name',
                method: 'get',
                func: this.findLikeSqlModelBrand,
                middlewares: [],
            },
            {
                path: '/tags',
                method: 'get',
                func: this.getTags,
                middlewares: [],
            },
        ]);
    }
    findLikeSqlModelBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productService.findLikeSqlModelBrand(req.params['name'].slice(1));
            if (!newProduct || (newProduct === null || newProduct === void 0 ? void 0 : newProduct.length) === 0) {
                return next(new http_error_1.HTTPError(401, 'продукт не найден'));
            }
            this.arr(res, newProduct);
        });
    }
    create({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productService.create(body);
            if (!newProduct) {
                return next(new http_error_1.HTTPError(401, 'Ошибка создания продукта'));
            }
            this.ok(res, Object.assign({}, newProduct));
        });
    }
    createModel({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productService.createModel(body);
            if (!newProduct) {
                return next(new http_error_1.HTTPError(401, 'Ошибка создания модел'));
            }
            this.ok(res, Object.assign({}, newProduct));
        });
    }
    createBrand(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.file) {
                console.log(request.body.name);
                const savearray = [new mfile_class_1.MFile(request.file)];
                if (request.file.mimetype.includes('image')) {
                    const buffer = yield this.fileService.convertToWebp(request.file.buffer);
                    savearray.push(new mfile_class_1.MFile({
                        originalname: `${request.file.originalname.split('.')[0]}.webp`,
                        buffer,
                    }));
                }
                const newBrand = yield this.productService.createBrand(savearray[0], request.body);
                this.ok(res, Object.assign({}, newBrand));
            }
            return next(new http_error_1.HTTPError(401, 'Ошибка создания модел'));
        });
    }
    uploadImage(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.file) {
                const savearray = [new mfile_class_1.MFile(request.file)];
                if (request.file.mimetype.includes('image')) {
                    const buffer = yield this.fileService.convertToWebp(request.file.buffer);
                    savearray.push(new mfile_class_1.MFile({
                        originalname: `${request.file.originalname.split('.')[0]}.webp`,
                        buffer,
                    }));
                }
                else {
                    return next(new http_error_1.HTTPError(401, 'Файл должен быть фотографией'));
                }
                const upload = yield this.productService.saveFile(savearray, request.body.productId);
                if (!upload) {
                    return next(new http_error_1.HTTPError(401, 'Ошибка сохранения фотографии'));
                }
                this.ok(res, {
                    mess: 'фото было обновлено с id',
                    id: request.file.originalname,
                    product: upload,
                });
            }
            else {
                return next(new http_error_1.HTTPError(401, 'Ошибка добавления фотографии'));
            }
        });
    }
    delete({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productService.delete(body.id);
            if (!newProduct) {
                return next(new http_error_1.HTTPError(404, 'Продукт не найден'));
            }
            this.ok(res, { mess: 'товар был удален с id', id: body.id });
        });
    }
    findByAlias(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productService.findByAlias(req.params['alias'].slice(1));
            if (!newProduct) {
                return next(new http_error_1.HTTPError(404, 'Продукт не найден'));
            }
            this.ok(res, Object.assign({}, newProduct));
        });
    }
    find(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productService.find(req.params['id'].slice(1));
            if (!newProduct) {
                return next(new http_error_1.HTTPError(404, 'Продукт не найден'));
            }
            this.ok(res, Object.assign({}, newProduct));
        });
    }
    getProductById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productService.getById(req.params['id'].slice(1));
            if (!newProduct) {
                return next(new http_error_1.HTTPError(404, 'Продукт не найден'));
            }
            this.ok(res, Object.assign({}, newProduct));
        });
    }
    getAllProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const Product = yield this.productService.getAll();
            return res.type('json').send(Product);
        });
    }
    getProducts({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findProducts(body.brandId);
            if (!product) {
                return next(new http_error_1.HTTPError(404, 'Продукт не найден'));
            }
            this.arr(res, product);
        });
    }
    getByFirstCategoryProducts({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productService.getByFirstCategory(body.firstLevelId);
            if (!products) {
                return next(new http_error_1.HTTPError(404, 'Нету такой категории'));
            }
            this.arr(res, products);
        });
    }
    updateProduct({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.update(body);
            if (!product) {
                return next(new http_error_1.HTTPError(404, 'Не найден продукт для обновление'));
            }
            this.ok(res, { mes: 'Продукт обновлен с id', id: product.id });
        });
    }
    setCategory({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.productService.setSecondCategory(body.name, body.firstLevelId, body.alias);
            if (!category) {
                return next(new http_error_1.HTTPError(400, 'Ошибка добавление под категории'));
            }
            this.ok(res, Object.assign({}, category));
        });
    }
    getCategory({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.productService.getCategory();
            if (!category) {
                return next(new http_error_1.HTTPError(400, 'Ошибка добавление под категории'));
            }
            return res.status(200).type('json').send(category);
        });
    }
    getFirstCategory({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.productService.getCategory();
            if (!category) {
                return next(new http_error_1.HTTPError(400, 'Ошибка добавление под категории'));
            }
            category.forEach((c) => delete c.secondLevelCategory);
            this.arr(res, category);
        });
    }
    setBrandOnSecondCategory({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.productService.setBrandOnSecondCategory(body);
            if (!category) {
                return next(new http_error_1.HTTPError(400, 'Ошибка добавление под категории'));
            }
            this.arr(res, category);
        });
    }
    setCategoryOnBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.file)
                return next(new http_error_1.HTTPError(400, 'Ошибка добавление под категории'));
            const brands = yield this.productService.setCategoryOnBrand(req.file, req.body);
            if (!brands) {
                return next(new http_error_1.HTTPError(400, 'Ошибка добавление под категории'));
            }
            this.arr(res, brands);
        });
    }
    getProductByBrandSecondCategory({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.productService.getProductByBrandSecondCategory(body.secondLevelId, body.brandId);
            if (!category) {
                return next(new http_error_1.HTTPError(400, 'Ошибка добавление под категории'));
            }
            this.ok(res, { category });
        });
    }
    getBrands(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.productService.getBrands();
            this.arr(res, category);
        });
    }
    getBrandProductByCategory({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.productService.getBrandProductByCategory(body.secondLevelId);
            if (!category || category.length === 0) {
                return next(new http_error_1.HTTPError(404, 'Неизвестная категория'));
            }
            this.arr(res, category);
        });
    }
    getProductsDiscount(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.getProductsDiscount();
            this.arr(res, product);
        });
    }
    getTags(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.getTags();
            this.arr(res, product);
        });
    }
};
ProductController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ProductService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.FileService)),
    __metadata("design:paramtypes", [Object, Object, Object, file_service_1.FileService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map