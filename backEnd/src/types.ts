import {MailService} from "./Mail/Mail.service";
import {CronRepository} from "./cront/cron.repository";
import {CryptomusService} from "./cryptomus/cryptomus.service";

export const TYPES = {
	Application: Symbol.for('Application'),
	UserService: Symbol.for('UserService'),
	ConfigService: Symbol.for('ConfigService'),
	ExceptionFilter: Symbol.for('ExceptionFilter'),
	PrismaService: Symbol.for('PrismaService'),
	LoggerService: Symbol.for('LoggerService'),
	UserController: Symbol.for('UserController'),
	UserRepository: Symbol.for('UserRepository'),
	ProductRepository: Symbol.for('ProductRepository'),
	ProductService: Symbol.for('ProductService'),
	ProductController: Symbol.for('ProductController'),
	UserAbilityService: Symbol.for('UserAbilityService'),
	UserAbilityRepository: Symbol.for('UserAbilityRepository'),
	userAbility: Symbol.for('userAbility'),
	FileService: Symbol.for('FileService'),
	FilesController: Symbol.for('FilesController'),
	BuyProductController: Symbol.for('BuyProductController'),
	BuyProductService: Symbol.for('BuyProductService'),
	BuyProductRepository: Symbol.for('BuyProductRepository'),
	AdminController: Symbol.for('AdminController'),
	AdminService: Symbol.for('AdminService'),
	AdminRepository: Symbol.for('AdminRepository'),
	MailService: Symbol.for('MailService'),
	CronRepository: Symbol.for('CronRepository'),
	CronService: Symbol.for('CronService'),
	CryptomusService: Symbol.for('CryptomusService'),
};
