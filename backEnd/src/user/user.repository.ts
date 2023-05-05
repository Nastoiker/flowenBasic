import { IUserRepository } from './user.repository.interface';
import { PrismaService } from '../database/prisma.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { Basket, UserModel, Comment, Address } from '@prisma/client';
import { User } from './user.entity';
import { UserAdressDto } from './dto/user-adress.dto';
import { UserEditProfileDto } from './dto/user-editProfile.dto';
import {VerfiyRegisterDto} from "./dto/user-register.dto";
@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async createUser({ email, login, hashpassword }: User): Promise<UserModel | null> {
		const checkExist = await this.prismaService.client.userModel.findUnique({
			where: {
				login,
			},
		});
		const checkExistEmail = await this.prismaService.client.userModel.findUnique({
			where: {
				email,
			},
		});
		if (checkExist || checkExistEmail) {
			return null;
		}
		return this.prismaService.client.userModel.create({
			data: {
				isActive: false,
				email,
				login,
				hashpassword,
			},
		});
	}
	async updateAvatar(avatar: string, id: string): Promise<UserModel> {
		return this.prismaService.client.userModel.update({
			where: {
				id,
			},
			data: {
				avatar,
			},
		});
	}
	async getBasketByUser(userId: string): Promise<Basket[] | null> {
		return this.prismaService.client.basket.findMany({
			where: {
				userId,
			},
			include: {
				product: {
					include: {
						brand: true,
						modelDevice: true,
					},
				},
			},
		});
	}
	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findUnique({
			where: {
				email,
			},
			include: {
				Comment: true,
				basket: true,
				rating: true,
				address: true,
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

	async getProfileInfoById(id: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				id,
			},
			include: {
				Comment: true,
			},
		});
	}
	async checkActiveUser(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
				isActive: true,
			},
		});
	}
	async verifyEmail(verifyEmail: VerfiyRegisterDto): Promise<UserModel | null> {
		const checkActive = await this.checkActiveUser(verifyEmail.email);
		const findUser = await this.find(verifyEmail.email);
		if (checkActive) {
			return null;
		} else {
			if (!findUser) {
				throw new Error('failed');
			}
			const verify = findUser.id.slice(0, 4);
			return this.prismaService.client.userModel.update({
				where: { email: findUser.email },
				data: {
					isActive: true,
				},
			});
		}
	}
	async deleteComment(commentId: string): Promise<Comment | null> {
		return this.prismaService.client.comment.delete({
			where: {
				id: commentId,
			},
		});
	}
	async createAddress(address: UserAdressDto): Promise<Address | null> {
		return this.prismaService.client.address.create({
			data: { ...address },
		});
	}
	async editAddress(address: UserAdressDto): Promise<Address | null> {
		const { userId, ...addressUser } = address;
		return this.prismaService.client.address.update({
			where: {
				userId,
			},
			data: {
				...addressUser,
			},
		});
	}
	async editProfileInfo(info: UserEditProfileDto, id: string): Promise<UserModel | null> {
		const { password, ...inf } = info;
		return this.prismaService.client.userModel.update({
			where: {
				id,
			},
			data: {
				...inf,
			},
		});
	}
}
