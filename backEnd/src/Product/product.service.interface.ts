import { Comment, ProductCreate, ProductUpdate } from './dto/create-product.dto';
import { Brand, FirstLevelCategory, Product, SecondLevelCategory } from '@prisma/client';

export interface IProductService {
	create: (product: ProductCreate) => Promise<Product | null>;
	find: (name: string) => Promise<Product | null>;
	getById: (id: number) => Promise<Product | null>;
	delete: (id: number) => Promise<Product | null>;
	update: (product: ProductUpdate) => Promise<Product | null>;
	getAll: () => Promise<(Product & { brand: Brand; Comment: Comment[] })[]>;
	getModelBrandId: (product: ProductCreate) => Promise<{
		brandId: number | undefined;
		modelDeviceId: number | undefined;
		secondLevelCategoryId: string;
		name: string;
		price: number;
		oldPrice?: number | undefined;
		TagId: number | undefined;
	}>;
	getByFirstCategory: (firstCategory: number) => Promise<SecondLevelCategory[] | null>;
	setSecondCategory: (name: string, firstLevelId: number) => Promise<SecondLevelCategory | null>;
	findProducts: (secondLevelCategoryId: string) => Promise<Product[] | null>;
	getCategory: () => Promise<FirstLevelCategory[] | null>;
}
