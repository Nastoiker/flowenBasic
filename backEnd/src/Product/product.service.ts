import { IProductService } from './product.service.interface';
import {
	Brand,
	Product,
	SecondLevelCategory,
	FirstLevelCategory,
	Comment,
	ModelDevice,
} from '@prisma/client';
import { ProductCreate, ProductModel, ProductUpdate } from './dto/create-product.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ProductRepository } from './product.repository';
import { writeFile, access, pathExistsSync } from 'fs-extra';
import { path } from 'app-root-path';
import sharp = require('sharp');

import { MFile } from '../files/mfile.class';
import { FileElementResponse } from '../files/dto/fileElement.response';
import { mkdir } from 'fs';
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

	async delete(id: string): Promise<Product | null> {
		return this.productRepository.deleteProduct(id);
	}

	async find(name: string): Promise<Product | null> {
		return this.productRepository.findProduct(name);
	}
	async findProducts(brandId: string): Promise<Product[] | null> {
		return this.productRepository.findProducts(brandId);
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
	async getAll(): Promise<(ModelDevice & { brand: Brand; Comment: Comment[] })[]> {
		return this.productRepository.getAllProducts();
	}
	async getByFirstCategory(firstLevelId: string): Promise<SecondLevelCategory[] | null> {
		return this.productRepository.getProductByCategory(firstLevelId);
	}
	async setSecondCategory(
		name: string,
		firstLevelId: string,
		alias: string,
	): Promise<SecondLevelCategory | null> {
		return this.productRepository.setSecondCategory(name, firstLevelId, alias);
	}
	async saveFile(files: MFile[], productId: string): Promise<FileElementResponse[] | null> {
		const product = await this.getById(productId);
		if (!product) {
			return null;
		}
		// const { brandId, modelDeviceId, name } = product;
		// @ts-ignore
		const brandId = product['brand']['name'];
		// @ts-ignore
		const modelDeviceId = product['modelDevice']['name'];
		const name = product.name;
		if (!pathExistsSync(`./uploads/product/${brandId}`)) {
			mkdir(`./uploads/product/${brandId}`, (err) => {
				// eslint-disable-next-line no-empty
				if (err) {
					return console.error(err);
				}
			});
		}
		if (!pathExistsSync(`./uploads/product/${brandId}/${modelDeviceId}`)) {
			mkdir(`./uploads/product/${brandId}/${modelDeviceId}`, (err) => {
				if (err) {
					return console.error(err);
				}
			});
		}
		const upload = `${path}/uploads/product`;
		const res: FileElementResponse[] = [];
		let images = '';
		for (const file of files) {
			await access(`${upload}/${brandId}/${modelDeviceId}/${file.originalname}`, (err) => {
				writeFile(
					`${upload}/${brandId}/${modelDeviceId}/${file.originalname}`,
					file.buffer,
				);
			});
			res.push({
				url: `${upload}/${brandId}/${modelDeviceId}/${name}`,
				name: file.originalname,
			});
			if (images.length > 0) {
				images.concat(`/${file.originalname}`);
			} else {
				images = file.originalname;
			}
		}
		await this.productRepository.updateByIdPhoto(productId, images);
		return res;
	}

	async convertToWebp(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}
	async getCategory(): Promise<FirstLevelCategory[] | null> {
		return this.productRepository.getCategory();
	}
	async getById(id: string): Promise<Product | null> {
		return this.productRepository.getProductById(id);
	}
	async setBrandOnSecondCategory(
		name: string,
		firstLevelId: string,
		alias: string,
		brands: string[],
	) {
		return this.productRepository.setBrandOnSecondCategory(name, firstLevelId, alias, brands);
	}
}
