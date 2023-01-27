import { BaseController } from '../common/base.controller';
import { Ilogger } from '../logger/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IUserController } from './user.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserService } from './user.service';
import { HTTPError } from '../errors/http-error';
import { ValidateMiddleware } from '../common/validate.middleware';
import { User } from './user.entity';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { AuthMiddleware } from '../common/auth.middleware';
import { AuthGuard } from '../common/Auth.guard';
import { OAuth2Client } from 'google-auth-library';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: Ilogger,
		@inject(TYPES.UserService) private userService: UserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/profile:id',
				method: 'get',
				func: this.profileInfo,
				middlewares: [],
			},
		]);
	}
	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			next(new HTTPError(422, 'Ошибка создания пользователя '));
		}
		this.ok(res, { email: result?.email, id: result?.id });
	}
	async loginByGoogle(
		{ body }: Request<{}, {}, { CLIENT_ID: string; token: string }>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const client = new OAuth2Client(body.CLIENT_ID);

		const ticket = await client.verifyIdToken({
			idToken: body.token,
			audience: body.CLIENT_ID,
		});
		const payload = ticket.getPayload();
		if (!payload) {
			return next(new HTTPError(401, 'ошибка авторизации', 'login'));
		}
		const email = payload['email'];
		const jwt = await this.jwtSign(email ?? '', this.configService.get('SECRET'));
		this.ok(res, { jwt });
	}
	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const checkDbUser = await this.userService.validateUser(body);
		if (!checkDbUser) {
			return next(new HTTPError(401, 'ошибка авторизации', 'login'));
		}
		const jwt = await this.jwtSign(body.email, this.configService.get('SECRET'));
		this.ok(res, { jwt });
	}
	public async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		const userModel = await this.userService.getUserInfo(user).then((result) => {
			if (result) {
				const { hashpassword, ...userInfo } = result;
				this.ok(res, { ...userInfo });
			}
		});
	}
	public async profileInfo(request: Request, res: Response, next: NextFunction): Promise<void> {
		const getInfoProfile = await this.userService.getProfileInfo(request.params['id'].slice(1));
		this.ok(res, { ...getInfoProfile });
	}
	public async jwtSign(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err: Error | null, token: string | undefined) => {
					if (err) {
						reject();
					}
					resolve(token as string);
				},
			);
		});
	}
}
