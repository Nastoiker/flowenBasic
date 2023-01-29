import { IUserRepository } from './user.repository.interface';
import { PrismaService } from '../database/prisma.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { Basket, UserModel } from '@prisma/client';
import { User } from './user.entity';
@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async createUser({ email, login, hashpassword }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				login,
				hashpassword,
			},
		});
	}
	async getBasketByUser(userId: string): Promise<Basket[] | null> {
		return this.prismaService.client.basket.findMany({
			where: {
				userId,
			},
			include: {
				product: true,
			},
		});
	}
	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
			include: {
				Comment: true,
			},
		});
	}
	async findProfile(login: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				login,
			},
			include: {
				Comment: true,
			},
		});
	}
}
