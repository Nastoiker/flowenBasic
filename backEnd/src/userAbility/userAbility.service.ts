import { Comment, Rating } from '../Product/dto/create-product.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUserRepository } from '../user/user.repository.interface';
import { ProductRepository } from '../Product/product.repository';
import { UserAbilityRepository } from './userAbility.repository';
import { UserModel, Basket } from '@prisma/client';
@injectable()
export class UserAbilityService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
		@inject(TYPES.ProductRepository) private productRepository: ProductRepository,
		@inject(TYPES.ProductRepository)
		private userAbilityServiceRepository: UserAbilityRepository,
	) {}

	async setComment(comment: Comment) {
		return this.productRepository.setCommentProduct(comment);
	}
	async addBasket(productId: string, userId: string, quantity: number): Promise<Basket | null> {
		return this.productRepository.addProductToBasket(productId, userId, quantity, false);
	}
	async getBasketUser(userId: string): Promise<Basket[] | null> {
		return this.userRepository.getBasketByUser(userId);
	}
	public async getUserInfo(user: string): Promise<UserModel | null> {
		return this.userRepository.find(user);
	}
	async setRatingProduct(rating: Rating): Promise<Rating | null> {
		return this.productRepository.setRating(rating);
	}
	async deleteBasket(id: string): Promise<Basket | null> {
		return this.productRepository.deleteProductToBasket(id);
	}
}
