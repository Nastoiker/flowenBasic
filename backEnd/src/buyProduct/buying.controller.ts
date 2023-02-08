import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IProductService } from '../Product/product.service.interface';
import { UserService } from '../user/user.service';
import { Ilogger } from '../logger/logger.interface';
import { UserAbilityService } from '../userAbility/userAbility.service';
import { AuthGuard } from '../common/Auth.guard';
import { ICryptomusService } from '../cryptomus/cryptomus.interface';
import { NextFunction, Request, Response } from 'express';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { HTTPError } from '../errors/http-error';
import { BuyingService } from './buying.service';

@injectable()
export class buying extends BaseController {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ProductService) private productService: IProductService,
		@inject(TYPES.UserService) private userService: UserService,
		@inject(TYPES.LoggerService) private loggerService: Ilogger,
		@inject(TYPES.UserAbilityService) private userAbilityService: UserAbilityService,
		@inject(TYPES.CryptomusService) private cryptomusService: ICryptomusService,
		@inject(TYPES.BuyingService) private  buyingService: BuyingService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/buy',
				method: 'post',
				func: this.buyingProduct,
				middlewares: [],
				// new AuthGuard()
			},
		]);
	}
	async buyingProduct(
		req: Request<{}, {}, { orderId: string; amount: number }>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const writtenById = await this.userService.getUserInfo(req.user);
		if (!writtenById) {
			return next(new HTTPError(422, 'Ошибка создания коммента '));
		}
		const payment = await this.cryptomusService.createPayment(10, '1');
		if (!payment) {
			return next(new HTTPError(400, 'Ошибка создания оплаты '));
		}
		await this.buyingService.createPayment(
			payment.result.uuid,
			payment.result.order_id,
			payment.result.status,
			payment.result.amount,
			payment.result.payment_amount,
			payment.result.is_final,
			payment.result.url,
			writtenById.id,
		);
		this.ok(res, { message: payment.result.url });
	}
}
