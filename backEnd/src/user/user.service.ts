import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { UserRegisterDto } from './dto/user-register.dto';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUserRepository } from './user.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}

	public async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const validateUSer = await this.userRepository.find(email);
		if (!validateUSer) {
			return false;
		}
		const newUser = new User(email, validateUSer.login, validateUSer.password);
		return newUser.comparePassword(password);
	}
	public async createUser({
		email,
		login,
		password,
	}: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, login);
		const checkDB = await this.userRepository.find(email);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		if (checkDB) {
			return null;
		}
		return this.userRepository.createUser(newUser);
	}
	public async getUserInfo(user: string): Promise<UserModel | null> {
		return this.userRepository.find(user);
	}
	public async getProfileInfo(login: string) {
		return await this.userRepository.findProfile(login).then((res) => {
			if (res) {
				const { password, email, ...profile } = res;
				return profile;
			}
		});
	}
}
