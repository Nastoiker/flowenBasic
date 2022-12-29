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
		]);
	}
	async productBuyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		const writtenById = await this.userService.getUserInfo(req.user);
		const productId = await this.productService.find(req.params['id'].slice(1));
		const product = { ...req.body, writtenById: writtenById?.id, productId: productId?.id };
		const result = await this.userAbilityService.setComment(product);
		if (!result) {
			next(new HTTPError(422, 'Ошибка создания коммента '));
		}
		this.ok(res, { mes: 'Ваш комментарий оставлен' });
	}
}
