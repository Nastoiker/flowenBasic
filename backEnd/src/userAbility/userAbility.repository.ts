import { IProductRepository } from '../Product/product.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';
import { Comment } from '../Product/dto/create-product.dto';
import {Basket} from "@prisma/client";
@injectable()
export class UserAbilityRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	async setCommentProduct(comment: Comment): Promise<Comment> {
		return this.prismaService.client.comment.create({
			data: {
				...comment,
			},
			include: {
				model: true,
				writtenBy: true,
			},
		});
	}
	async addProductToBasket(
		productId: string,
		userId: string,
		quantity: number,
		buying: boolean,
	): Promise<Basket | null> {
		return this.prismaService.client.basket.create({
			data: {
				productId,
				userId,
				quantity,
				buying,
			},
		});
	}

}
