import express, { Express } from 'express';
import { Server } from 'http';
import { Ilogger } from './logger/logger.interface';
import { IExceptionFilter } from './errors/exeption.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';
import { UserController } from './user/user.controller';
import { json } from 'body-parser';
import { PrismaService } from './database/prisma.service';
import { IConfigService } from './config/config.service.interface';
import { IUserRepository } from './user/user.repository.interface';
import { AuthMiddleware } from './common/auth.middleware';
import { IProductRepository } from './Product/product.repository.interface';
import { ProductController } from './Product/product.controller';
import { UserAbilityRepository } from './userAbility/userAbility.repository';
import { userAbility } from './userAbility/userAbility.controller';
import cors from 'cors';
import multer from 'multer';
@injectable()
export class App {
	server!: Server;
	app: Express;
	port: number;
	constructor(
		@inject(TYPES.LoggerService) private logger: Ilogger,
		@inject(TYPES.ExceptionFilter) private exception: IExceptionFilter,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
		@inject(TYPES.ProductRepository) private ProductRepository: IProductRepository,
		@inject(TYPES.ProductController) private productController: ProductController,
		@inject(TYPES.UserAbilityRepository) private userAbilityRepository: UserAbilityRepository,
		@inject(TYPES.userAbility) private UserAbility: userAbility,
	) {
		this.app = express();
		this.port = 8000;
	}
	public useExceptionFilter(): void {
		this.app.use(this.exception.catch.bind(this.exception));
	}
	public useMiddleWares(): void {
		// const upload = new multer({ dest: './uploads/' });
		this.app.use(express.static(__dirname));
		this.app.use(json());
		this.app.use(cors());
		const authMiddleWare = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleWare.execute.bind(authMiddleWare));
	}
	public useRoutes(): void {
		this.app.use('/users', this.userController.router);
		this.app.use('/product', this.productController.router);
		this.app.use('/product', this.UserAbility.router);
	}
	public async init(): Promise<void> {
		this.useMiddleWares();
		this.useRoutes();
		this.useExceptionFilter();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен localhost на порту:${this.port}`);
	}
	public async close(): Promise<void> {
		this.server.close();
	}
}
