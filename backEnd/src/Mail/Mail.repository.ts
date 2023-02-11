import { inject, injectable } from 'inversify';
import { IProductRepository } from '../Product/product.repository.interface';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';

@injectable()
export class MailRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	async getEmailAllUser(): Promise<string[]> {
		const email = await this.prismaService.client.userModel.findMany({});
		return email.map((e) => e.email);
	}
}
