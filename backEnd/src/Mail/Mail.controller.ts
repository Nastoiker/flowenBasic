import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IProductService } from '../Product/product.service.interface';
import { UserService } from '../user/user.service';
import { Ilogger } from '../logger/logger.interface';
import { UserAbilityService } from '../userAbility/userAbility.service';
import { ICryptomusService } from '../cryptomus/cryptomus.interface';
import { BuyingService } from '../buyProduct/buying.service';
import { CronService } from '../cront/cron.service';
import { AuthGuard } from '../common/Auth.guard';
import { NextFunction, Request, Response } from 'express';
import { MulterMiddleware } from '../common/Multer.middleware';
import xml from 'xml';
import { FileElementResponse } from '../files/dto/fileElement.response';
import { HTTPError } from '../errors/http-error';
import { MailService } from './Mail.service';
import {AdminGuard} from "../common/admin.guard";

@injectable()
export class MailController extends BaseController {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.LoggerService) private loggerService: Ilogger,
		@inject(TYPES.MailService) private mailService: MailService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/sendNews',
				method: 'post',
				func: this.sendNews,
				middlewares: [new AuthGuard(), new MulterMiddleware()],
			},
		]);
	}
	async sendNews(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<FileElementResponse[] | void> {
		if (req.file) {
			const publish = await this.mailService.sendForAll(req.file);
			if (typeof publish === null) {
				return next(new HTTPError(401, 'ошибка публикации'));
			} else {
				this.ok(res, { mes: 'новость опубликована' });
			}
		} else {
			return next(new HTTPError(401, 'в запросе должен быть файл'));
		}
	}
}
