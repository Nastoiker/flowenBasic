import { PrismaService } from '../database/prisma.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import {
	BrandDevice,
	Comment,
	ModelDeviceDto,
	ProductModel,
	ProductUpdate,
} from './dto/create-product.dto';
import {
	Brand,
	ModelDevice,
	Product,
	Tag,
	SecondLevelCategory,
	FirstLevelCategory,
} from '@prisma/client';
import { IProductRepository } from './product.repository.interface';

@injectable()
export class ProductRepository implements IProductRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	async createProduct(data: ProductModel): Promise<Product> {
		return this.prismaService.client.product.create({
			data: { ...data },
		});
	}
	async findProduct(name: string): Promise<Product | null> {
		return this.prismaService.client.product.findFirst({
			where: {
				name,
			},
		});
	}
	async getProductById(id: number): Promise<Product | null> {
		return this.prismaService.client.product.findFirst({
			where: {
				id,
			},
		});
	}
	async findProducts(secondLevelCategoryId: string): Promise<Product[] | null> {
		return this.prismaService.client.product.findMany({
			where: {
				secondLevelCategoryId,
			},
		});
	}
	async deleteProduct(id: number): Promise<Product | null> {
		return this.prismaService.client.product.delete({
			where: {
				id,
			},
		});
	}
	async getProductByCategory(firstLevelId: number): Promise<SecondLevelCategory[] | null> {
		return this.prismaService.client.secondLevelCategory.findMany({
			where: {
				firstLevelId,
			},
		});
	}
	async updateByIdPrice(id: number, price: number): Promise<Product | null> {
		return this.prismaService.client.product.update({
			where: {
				id,
			},
			data: {
				price,
			},
		});
	}
	async updateProduct(id: number, product: ProductUpdate): Promise<Product | null> {
		return this.prismaService.client.product.update({
			where: {
				id,
			},
			data: {
				...product,
			},
		});
	}
	async createBrandProduct(brand: BrandDevice): Promise<Brand | null> {
		return this.prismaService.client.brand.create({
			data: { ...brand },
		});
	}
	async findBrandByName(name: string): Promise<Brand | null> {
		return this.prismaService.client.brand.findFirst({
			where: {
				name,
			},
			include: {
				Product: true,
			},
		});
	}
	async createModelProduct(model: ModelDeviceDto): Promise<ModelDevice | null> {
		return this.prismaService.client.brand.create({
			data: { ...model },
		});
	}
	async findModelByName(name: string): Promise<ModelDevice | null> {
		return this.prismaService.client.modelDevice.findFirst({
			where: {
				name,
			},
			include: {
				Product: true,
			},
		});
	}
	async findTagByName(name: string): Promise<Tag | null> {
		return this.prismaService.client.tag.findFirst({
			where: {
				name,
			},
			include: {
				Product: true,
			},
		});
	}
	async getAllProducts() {
		return await this.prismaService.client.product.findMany({
			include: {
				brand: true,
				Comment: true,
			},
		});
	}
	async setCommentProduct(comment: Comment): Promise<Comment> {
		return this.prismaService.client.comment.create({
			data: {
				...comment,
			},
			include: {
				Product: true,
				writtenBy: true,
			},
		});
	}
	async setSecondCategory(name: string, firstLevelId: number): Promise<SecondLevelCategory> {
		return this.prismaService.client.secondLevelCategory.create({
			data: {
				name,
				firstLevelId,
			},
			include: {
				firstLevelCategory: true,
			},
		});
	}
	async getCategory(): Promise<FirstLevelCategory[]> {
		return this.prismaService.client.firstLevelCategory.findMany({
			include: {
				secondLevelCategory: true,
			},
		});
	}
}
// constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
// async create({
// 	firstLevelCategory,
// 	secondLevelCategory,
// 	brand,
// 	modelDevice,
// 	name,
// 	price,
// 	oldPrice,
// 	tags,
// 	brandId,
// 	modelDeviceId,
// 	Comment,
// }: ProductCreate): Promise<Product> {
// 	const commentest = JSON.stringify(Comment);
// 	return this.prismaService.client.product.create({
// 		data: {
// 			firstLevelCategory,S
// 			secondLevelCategory,
// 			brand: {
// 				create: {
// 					...brand,
// 				},
// 			},
// 			modelDevice: {S
// 				create: {
// 					...modelDevice,
// 				},
// 			},
// 			name,
// 			price,
// 			oldPrice,
// 			brandId,
// 			modelDeviceId,
// 			Comment: {
// 				create: [
// 					...commentest,
// 			},
// 		},
// 		include: {
// 			Comment: true,
// 		},
// 	});
// }
