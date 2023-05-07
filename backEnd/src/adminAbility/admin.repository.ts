import { inject, injectable } from 'inversify';
import { IProductRepository } from '../Product/product.repository.interface';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';
import {ModelDevice, Tag, Comment, UserModel, SecondLevelCategory, FirstLevelCategory} from '@prisma/client';

@injectable()
export class AdminRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	async deleteModel(id: string): Promise<ModelDevice> {
		return this.prismaService.client.modelDevice.delete({
			where: {
				id,
			},
		});
	}
	async deleteCategory(id: string): Promise<FirstLevelCategory> {
		return this.prismaService.client.firstLevelCategory.delete({
			where: {
				id,
			},
		});
	}
	async deleteTagFromProduct(id: string): Promise<Comment> {
		return this.prismaService.client.comment.delete({
			where: {
				id,
			},
		});
	}
	async deleteSecondCategory(id: string): Promise<SecondLevelCategory | null> {
		return this.prismaService.client.secondLevelCategory.delete({
			where: {
				id,
			},
		});
	}
	async deleteUser(id: string): Promise<UserModel> {
		return this.prismaService.client.userModel.delete({
			where: {
				id,
			},
		});
	}

	async users(): Promise<UserModel[]> {
		return this.prismaService.client.userModel.findMany({
			where: {},
		});
	}
	async deleteComment(id: string): Promise<Comment> {
		return this.prismaService.client.comment.delete({
			where: {
				id,
			},
		});
	}
	async updateTagFromProduct(id: string, TagId: string): Promise<Tag> {
		return this.prismaService.client.product.update({
			where: {
				id,
			},
			data: {
				TagId,
			},
		});
	}
}
