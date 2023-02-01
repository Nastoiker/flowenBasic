import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IProductService } from '../Product/product.service.interface';
import { UserService } from '../user/user.service';
import { Ilogger } from '../logger/logger.interface';
import { UserAbilityService } from '../userAbility/userAbility.service';
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
				func: this.buyingProduct,
				middlewares: [new AuthGuard()],
			},
		]);
	}
	async buyingProduct() {
		console.log(1);
	}
}
