import { IProductService } from './product.service.interface';
import { Brand, Product, SecondLevelCategory, FirstLevelCategory } from '@prisma/client';
import { Comment, ProductCreate, ProductModel, ProductUpdate } from './dto/create-product.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ProductRepository } from './product.repository';
@injectable()
export class ProductService implements IProductService {
	constructor(@inject(TYPES.ProductRepository) private productRepository: ProductRepository) {}
	async create(product: ProductCreate): Promise<Product | null> {
		if (await this.productRepository.findProduct(product.name)) {
			return null;
		}
		const checkProduct = await this.getModelBrandId(product);
		return this.productRepository.createProduct(checkProduct as unknown as ProductModel);
	}

	async delete(id: number): Promise<Product | null> {
		return this.productRepository.deleteProduct(id);
	}

	async find(name: string): Promise<Product | null> {
		return this.productRepository.findProduct(name);
	}
	async findProducts(secondLevelCategoryId: string): Promise<Product[] | null> {
		return this.productRepository.findProducts(secondLevelCategoryId);
	}
	async update(product: ProductUpdate): Promise<Product | null> {
		const id = await this.productRepository.findProduct(product.name);
		if (!id) {
			return null;
		}
		return this.productRepository.updateProduct(id.id, product);
	}
	async getModelBrandId(product: ProductCreate) {
		const brandId = await this.productRepository.findBrandByName(product.brandId);
		const modelId = await this.productRepository.findModelByName(product.modelDeviceId);
		const tag = await this.productRepository.findTagByName(product.TagId);
		return { ...product, brandId: brandId?.id, modelDeviceId: modelId?.id, TagId: tag?.id };
	}
	async getAll(): Promise<(Product & { brand: Brand; Comment: Comment[] })[]> {
		return this.productRepository.getAllProducts();
	}
	async getByFirstCategory(firstLevelId: number): Promise<SecondLevelCategory[] | null> {
		return this.productRepository.getProductByCategory(firstLevelId);
	}
	async setSecondCategory(
		name: string,
		firstLevelId: number,
	): Promise<SecondLevelCategory | null> {
		return this.productRepository.setSecondCategory(name, firstLevelId);
	}
	async getCategory(): Promise<FirstLevelCategory[] | null> {
		return this.productRepository.getCategory();
	}
	async getById(id: number): Promise<Product | null> {
		return this.productRepository.getProductById(id);
	}
}
