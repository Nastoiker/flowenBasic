import { Comment } from '../Product/dto/create-product.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUserRepository } from '../user/user.repository.interface';
import { ProductRepository } from '../Product/product.repository';
import { UserAbilityRepository } from './userAbility.repository';
import { UserModel } from '@prisma/client';
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
	public async getUserInfo(user: string): Promise<UserModel | null> {
		return this.userRepository.find(user);
	}
}
