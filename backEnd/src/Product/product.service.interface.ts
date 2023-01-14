import { Comment, ProductCreate, ProductUpdate } from './dto/create-product.dto';
import { Brand, FirstLevelCategory, Product, SecondLevelCategory } from '@prisma/client';

export interface IProductService {
	create: (product: ProductCreate) => Promise<Product | null>;
	find: (name: string) => Promise<Product | null>;
	getById: (id: string) => Promise<Product | null>;
	delete: (id: string) => Promise<Product | null>;
	update: (product: ProductUpdate) => Promise<Product | null>;
	getAll: () => Promise<(Product & { brand: Brand; Comment: Comment[] })[]>;
	getModelBrandId: (product: ProductCreate) => Promise<{
		brandId: string | undefined;
		modelDeviceId: string | undefined;
		name: string;
		price: number;
		oldPrice?: number | undefined;
		TagId: string | undefined;
	}>;
	getByFirstCategory: (firstCategory: string) => Promise<SecondLevelCategory[] | null>;
	setSecondCategory: (
		name: string,
		firstLevelId: string,
		alias: string,
	) => Promise<SecondLevelCategory | null>;
	findProducts: (brandId: string) => Promise<Product[] | null>;
	getCategory: () => Promise<FirstLevelCategory[] | null>;
}
