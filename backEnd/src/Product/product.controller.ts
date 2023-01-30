import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import { Ilogger } from '../logger/logger.interface';
import { BaseController } from '../common/base.controller';
import { Comment, ModelDeviceDto, ProductCreate, ProductUpdate } from './dto/create-product.dto';
import { IProductService } from './product.service.interface';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error';
import { AdminGuard } from '../common/admin.guard';
import { ValidateMiddleware } from '../common/validate.middleware';
import { AuthGuard } from '../common/Auth.guard';
import { OutInterface } from '../common/route.interface';
import { MFile } from '../files/mfile.class';
import { FileElementResponse } from '../files/dto/fileElement.response';
import { MulterMiddleware } from '../common/Multer.middleware';
import multer from 'multer';
import { setBrandsOnCategory, setSecondCategoryOnBrand } from './dto/firstCategory.dto';
@injectable()
export class ProductController extends BaseController {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ProductService) private productService: IProductService,
		@inject(TYPES.LoggerService) private loggerService: Ilogger,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/create',
				method: 'post',
				func: this.create,
				middlewares: [new AdminGuard(), new ValidateMiddleware(ProductCreate)],
			},
			{
				path: '/delete',
				method: 'delete',
				func: this.delete,
				middlewares: [new AdminGuard()],
			},
			{
				path: '/update',
				method: 'patch',
				func: this.updateProduct,
				middlewares: [new AdminGuard(), new ValidateMiddleware(ProductUpdate)],
			},
			{
				path: '/info:id',
				method: 'get',
				func: this.find,
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
				middlewares: [new AdminGuard()],
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
				middlewares: [new AdminGuard(), new MulterMiddleware()],
			},
			{
				path: '/setSecondCategoryBrand',
				method: 'post',
				func: this.setBrandOnSecondCategory,
				middlewares: [new AdminGuard()],
			},
			{
				path: '/createModel',
				method: 'post',
				func: this.createModel,
				middlewares: [new AdminGuard()],
			},
			{
				path: '/createBrand',
				method: 'post',
				func: this.createBrand,
				middlewares: [new AdminGuard()],
			},
			//создание категории к брендам
			{
				path: '/setBrandOnSecondCategory',
				method: 'post',
				func: this.setBrandOnSecondCategory,
				middlewares: [new AdminGuard()],
			},
			//создание брендов к категории
			{
				path: '/setCategoryOnBrand',
				method: 'post',
				func: this.setCategoryOnBrand,
				middlewares: [new AdminGuard()],
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
		]);
	}
	async create(
		{ body }: Request<{}, {}, ProductCreate>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const newProduct = await this.productService.create(body);
		if (!newProduct) {
			return next(new HTTPError(401, 'Ошибка создания продукта'));
		}
		this.ok(res, { ...newProduct });
	}
	async createModel(
		{ body }: Request<{}, {}, ModelDeviceDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const newProduct = await this.productService.createModel(body);
		if (!newProduct) {
			return next(new HTTPError(401, 'Ошибка создания модел'));
		}
		this.ok(res, { ...newProduct });
	}
	async createBrand(
		{ body }: Request<{}, {}, ProductCreate>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const newProduct = await this.productService.createBrand(body);
		if (!newProduct) {
			return next(new HTTPError(401, 'Ошибка создания модел'));
		}
		this.ok(res, { ...newProduct });
	}
	async uploadImage(
		request: Request<{}, {}, { productId: string }>,
		res: Response,
		next: NextFunction,
	): Promise<FileElementResponse[] | void> {
		if (request.file) {
			const savearray: MFile[] = [new MFile(request.file)];
			if (request.file.mimetype.includes('image')) {
				const buffer = await this.productService.convertToWebp(request.file.buffer);
				savearray.push(
					new MFile({
						originalname: `${request.file.originalname.split('.')[0]}.webp`,
						buffer,
					}),
				);
			} else {
				return next(new HTTPError(401, 'Файл должен быть фотографией'));
			}
			const upload = await this.productService.saveFile(savearray, request.body.productId);
			if (!upload) {
				return next(new HTTPError(401, 'Ошибка добавления фотографии'));
			}
			this.ok(res, { mess: 'фото было обновлено с id', id: request.file.originalname });
		} else {
			return next(new HTTPError(401, 'Ошибка добавления фотографии'));
		}
	}
	async delete({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const newProduct = await this.productService.delete(body.id);
		if (!newProduct) {
			return next(new HTTPError(404, 'Продукт не найден'));
		}
		this.ok(res, { mess: 'товар был удален с id', id: body.id });
	}

	async find(req: Request, res: Response, next: NextFunction): Promise<void> {
		const newProduct = await this.productService.find(req.params['id'].slice(1));
		if (!newProduct) {
			return next(new HTTPError(404, 'Продукт не найден'));
		}
		this.ok(res, { ...newProduct });
	}
	async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
		const newProduct = await this.productService.getById(req.params['id'].slice(1));
		if (!newProduct) {
			return next(new HTTPError(404, 'Продукт не найден'));
		}
		this.ok(res, { ...newProduct });
	}
	async getAllProduct(req: Request, res: Response, next: NextFunction): Promise<OutInterface> {
		const Product = await this.productService.getAll();
		return res.type('json').send(Product);
	}
	async getProducts(
		{ body }: Request<{}, {}, { brandId: string }>,
		res: Response,
		next: NextFunction,
	): Promise<void | OutInterface> {
		const product = await this.productService.findProducts(body.brandId);
		if (!product) {
			return next(new HTTPError(404, 'Продукт не найден'));
		}
		return res.status(200).type('json').send(product);
	}
	async getByFirstCategoryProducts(
		{ body }: Request<{}, {}, { firstLevelId: string }>,
		res: Response,
		next: NextFunction,
	): Promise<void | OutInterface> {
		const products = await this.productService.getByFirstCategory(body.firstLevelId);
		if (!products) {
			return next(new HTTPError(404, 'Нету такой категории'));
		}
		return res.status(200).type('json').send(products);
	}

	async updateProduct(
		{ body }: Request<{}, {}, ProductUpdate>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const product = await this.productService.update(body);
		if (!product) {
			return next(new HTTPError(404, 'Не найден продукт для обновление'));
		}
		this.ok(res, { mes: 'Продукт обновлен с id', id: product.id });
	}
	async setCategory(
		{ body }: Request<{}, {}, { name: string; firstLevelId: string; alias: string }>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const category = await this.productService.setSecondCategory(
			body.name,
			body.firstLevelId,
			body.alias,
		);
		if (!category) {
			return next(new HTTPError(400, 'Ошибка добавление под категории'));
		}
		this.ok(res, { ...category });
	}
	async getCategory(
		{ body }: Request,
		res: Response,
		next: NextFunction,
	): Promise<void | OutInterface> {
		const category = await this.productService.getCategory();
		if (!category) {
			return next(new HTTPError(400, 'Ошибка добавление под категории'));
		}
		return res.status(200).type('json').send(category);
	}
	async getFirstCategory(
		{ body }: Request,
		res: Response,
		next: NextFunction,
	): Promise<void | OutInterface> {
		const category = await this.productService.getCategory();
		if (!category) {
			return next(new HTTPError(400, 'Ошибка добавление под категории'));
		}
		// @ts-ignore
		category.forEach((c) => delete c.secondLevelCategory);
		return res.status(200).type('json').send(category);
	}
	//создание категории к брендам
	async setBrandOnSecondCategory(
		{ body }: Request<{}, {}, setSecondCategoryOnBrand>,
		res: Response,
		next: NextFunction,
	): Promise<void | OutInterface> {
		const category = await this.productService.setBrandOnSecondCategory(body);
		if (!category) {
			return next(new HTTPError(400, 'Ошибка добавление под категории'));
		}
		return res.status(200).type('json').send(category);
	}
	//создание брендов к категории
	async setCategoryOnBrand(
		{ body }: Request<{}, {}, setBrandsOnCategory>,
		res: Response,
		next: NextFunction,
	): Promise<void | OutInterface> {
		const brands = await this.productService.setCategoryOnBrand(body);
		if (!brands) {
			return next(new HTTPError(400, 'Ошибка добавление под категории'));
		}
		return res.status(200).type('json').send(brands);
	}
	async getProductByBrandSecondCategory(
		{ body }: Request<{}, {}, { secondLevelId: string; brandId: string }>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const category = await this.productService.getProductByBrandSecondCategory(
			body.secondLevelId,
			body.brandId,
		);
		if (!category) {
			return next(new HTTPError(400, 'Ошибка добавление под категории'));
		}
		this.ok(res, { ...category });
	}
	async getBrands(
		request: Request,
		res: Response,
		next: NextFunction,
	): Promise<void | OutInterface> {
		const category = await this.productService.getBrands();
		return res.status(200).type('json').send(category);
	}
}
