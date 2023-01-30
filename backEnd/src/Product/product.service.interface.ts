import {
	Comment,
	ProductCreate,
	ProductUpdate,
	ModelCreate,
	ModelDeviceDto,
	BrandDevice,
} from './dto/create-product.dto';
import {
	setBrandsOnCategory,
	setSecondCategoryOnBrand
} from './dto/firstCategory.dto';
import {
	Brand,
	FirstLevelCategory,
	ModelDevice,
	Product,
	SecondLevelCategory,
} from '@prisma/client';
import { FileElementResponse } from '../files/dto/fileElement.response';
import { MFile } from '../files/mfile.class';
import sharp from 'sharp';

export interface IProductService {
	create: (product: ProductCreate) => Promise<Product | null>;
	createModel: (model: ModelDeviceDto) => Promise<ModelDevice | null>;
	createBrand: (brand: BrandDevice) => Promise<Brand | null>;

	find: (name: string) => Promise<Product | null>;
	getById: (id: string) => Promise<Product | null>;
	delete: (id: string) => Promise<Product | null>;
	update: (product: ProductUpdate) => Promise<Product | null>;
	getAll: () => Promise<(ModelDevice & { brand: Brand; Comment: Comment[] })[]>;
	getModelBrandId: (product: ProductCreate) => Promise<{
		brandId: string | undefined;
		modelDeviceId: string | undefined;
		name: string;
		price: number;
		oldPrice?: number | undefined;
		TagId: string | undefined;
	}>;
	setBrandOnSecondCategory: (setBrands: setSecondCategoryOnBrand) => Promise<SecondLevelCategory>;
	setCategoryOnBrand: (setCategoryOnBrand: setBrandsOnCategory) => Promise<Brand>;
	getByFirstCategory: (firstCategory: string) => Promise<SecondLevelCategory[] | null>;
	setSecondCategory: (
		name: string,
		firstLevelId: string,
		alias: string,
	) => Promise<SecondLevelCategory | null>;
	findProducts: (brandId: string) => Promise<Product[] | null>;
	getCategory: () => Promise<FirstLevelCategory[] | null>;
	getProductByBrandSecondCategory: (secondLevelId: string, brandId: string) => Promise<Model[] | null>;
	saveFile: (files: MFile[], productId: string) => Promise<FileElementResponse[] | null>;
	convertToWebp: (file: Buffer) => Promise<Buffer>;
}
