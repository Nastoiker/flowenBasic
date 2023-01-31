import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IProductService } from '../Product/product.service.interface';
import { Ilogger } from '../logger/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error';
import { UserService } from '../user/user.service';
import { UserAbilityService } from './userAbility.service';
import { AuthGuard } from '../common/Auth.guard';
@injectable()
export class userAbility extends BaseController {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ProductService) private productService: IProductService,
		@inject(TYPES.UserService) private userService: UserService,
		@inject(TYPES.LoggerService) private loggerService: Ilogger,
		@inject(TYPES.UserAbilityService) private userAbilityService: UserAbilityService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/info:id',
				method: 'post',
				func: this.productBuyUser,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/addBasket',
				method: 'post',
				func: this.addProductToBasket,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/deleteBasket',
				method: 'post',
				func: this.deleteProductToBasket,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/getBasket',
				method: 'get',
				func: this.getBasketUser,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/comment',
				method: 'post',
				func: this.setComment,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/setRating',
				method: 'post',
				func: this.setRatingProduct,
				middlewares: [new AuthGuard()],
			},
		]);
	}
	async productBuyUser(
		req: Request<
			{},
			{},
			{ productId: string; title: string; comment: string; pictures: string }
		>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const writtenById = await this.userService.getUserInfo(req.user);
		const productId = await this.productService.find(req.body.productId);
		if (!productId || !writtenById) {
			next(new HTTPError(422, 'не найдены ids'));
		} else {
			const product = {
				...req.body,
				writtenById: writtenById.id,
				modelDeviceId: productId.id,
				pictures: req.body.pictures,
			};
			const result = await this.userAbilityService.setComment(product);
			if (!result) {
				next(new HTTPError(422, 'Ошибка создания коммента '));
			}
			this.ok(res, { mes: 'Ваш комментарий оставлен' });
		}
	}
	async addProductToBasket(
		req: Request<{}, {}, { productId: string; quantity: number }>,
		res: Response,
		next: NextFunction,
	) {
		const writtenById = await this.userService.getUserInfo(req.user);
		if (!writtenById) {
			next(new HTTPError(422, 'Ошибка добавления товара в корзину'));
		} else {
			await this.userAbilityService.addBasket(
				req.body.productId,
				writtenById.id,
				req.body.quantity,
			);
		}
	}
	async deleteProductToBasket(
		req: Request<{}, {}, { id: string }>,
		res: Response,
		next: NextFunction,
	) {
		const writtenById = await this.userService.getUserInfo(req.user);
		if (!writtenById) {
			next(new HTTPError(422, 'Ошибка добавления товара в корзину'));
		} else {
			await this.userAbilityService.deleteBasket(req.body.id);
		}
	}
	async setComment(
		req: Request<
			{},
			{},
			{
				comment: string;
				writtenById: string;
				modelDeviceId: string;
				title: string;
				pictures: string;
			}
		>,
		res: Response,
		next: NextFunction,
	) {
		const writtenById = await this.userService.getUserInfo(req.user);
		if (!writtenById) {
			next(new HTTPError(422, 'Ошибка создания коммента '));
		} else {
			await this.userAbilityService.setComment({
				comment: req.body.comment,
				modelDeviceId: req.body.modelDeviceId,
				writtenById: writtenById.id,
				title: req.body.title,
				pictures: req.body.pictures,
			});
		}
	}
	async setRatingProduct(
		req: Request<{}, {}, { productId: string; quanity: number }>,
		res: Response,
		next: NextFunction,
	) {
		const writtenById = await this.userService.getUserInfo(req.user);
		if (!writtenById) {
			next(new HTTPError(422, 'Ошибка рейтинга '));
		} else {
			await this.userAbilityService.setRatingProduct({
				modelDeviceId: req.body.productId,
				writtenById: writtenById.id,
				number: req.body.quanity,
			});
		}
	}
	async getBasketUser(req: Request, res: Response, next: NextFunction) {
		const writtenById = await this.userService.getUserInfo(req.user);
		if (!writtenById) {
			next(new HTTPError(422, 'Ошибка получения корзины '));
		} else {
			await this.userAbilityService.getBasketUser(writtenById.id);
		}
	}
}
