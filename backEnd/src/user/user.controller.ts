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
import { MulterMiddleware } from '../common/Multer.middleware';
import { MFile } from '../files/mfile.class';
import { FileService } from '../files/file.service';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: Ilogger,
		@inject(TYPES.UserService) private userService: UserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.FileService) private fileService: FileService,
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
			{
				path: '/updateAvatar',
				method: 'post',
				func: this.updateAvatar,
				middlewares: [new AuthGuard(), new MulterMiddleware()],
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
	public async updateAvatar(request: Request, res: Response, next: NextFunction): Promise<void> {
		const writtenById = await this.userService.getUserInfo(request.user);
		if (request.file) {
			if (!request.file.mimetype.includes('image')) {
				return next(new HTTPError(401, 'Файл должен быть фотографией'));
			}
			const buffer = await this.fileService.convertToWebp(request.file.buffer);
			const file = new MFile({
				originalname: `${request.file.originalname.split('.')[0]}.webp`,
				buffer,
			});
			const upload = await this.userService.saveAvatar(file, writtenById!.id);
			if (!upload) {
				return next(new HTTPError(401, 'Ошибка добавления аватара'));
			}
			this.ok(res, { mess: 'фото было обновлено с id', id: request.file.originalname });
		} else {
			return next(new HTTPError(401, 'Ошибка обновления аватара'));
		}
	}
}
