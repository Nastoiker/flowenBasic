import { ProductModel } from './dto/create-product.dto';
import {FirstLevelCategory, Product} from '@prisma/client';

export interface IProductRepository {
	createProduct: (product: ProductModel) => Promise<Product>;
	findProduct: (name: string) => Promise<Product | null>;
	deleteProduct: (id: number) => Promise<Product | null>;
	updateByIdPrice: (id: number, price: number) => Promise<Product | null>;
	findProducts: (secondLevelCategoryId: string) => Promise<Product[] | null>;
	getCategory: () => Promise<FirstLevelCategory[] | null>;
}
