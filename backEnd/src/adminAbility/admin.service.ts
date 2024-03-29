import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ProductRepository } from '../Product/product.repository';
import { AdminRepository } from './admin.repository';

@injectable()
export class AdminService {
	constructor(@inject(TYPES.AdminRepository) private adminRepository: AdminRepository) {}

	async users() {
		return this.adminRepository.users();
	}
	async deleteCategory(id: string) {
		return this.adminRepository.deleteCategory(id);
	}
	async deleteTagFromProduct(id: string, productId: string) {
		return this.adminRepository.deleteTagFromProduct(id);
	}
	async deleteSecondCategory(id: string) {
		return this.adminRepository.deleteSecondCategory(id);
	}
	async deleteUser(id: string) {
		return this.adminRepository.deleteUser(id);
	}
	async deleteModel(id: string) {
		return this.adminRepository.deleteModel(id);
	}
	async updateTagFromProduct(productId: string, tagId: string) {
		return this.adminRepository.updateTagFromProduct(productId, tagId);
	}
	async deleteComment(commentId: string) {
		return this.adminRepository.deleteComment(commentId);
	}
}
