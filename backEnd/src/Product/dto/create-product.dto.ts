import { IsArray, IsNumber, IsString, IsOptional, IsDate } from 'class-validator';
import { UserModel } from '@prisma/client';
export class ProductModel {
	@IsString()
	secondLevelCategoryId: string;
	@IsString()
	name: string;
	@IsNumber()
	price: number;
	@IsOptional()
	@IsNumber()
	oldPrice?: number;
	@IsNumber()
	brandId: number;
	@IsNumber()
	TagId: number;
	@IsNumber()
	modelDeviceId: number;
}
export class ProductUpdate {
	@IsString()
	name: string;
	@IsNumber()
	price: number;
	@IsOptional()
	@IsNumber()
	oldPrice: number;
}
// export class ProductModel {
// 	@IsString()
// 	firstLevelCategory: string;
// 	@IsString()
// 	secondLevelCategory: string;
// 	@IsString()
// 	name: string;
// 	@IsNumber()
// 	price: number;
// 	@IsOptional()
// 	@IsNumber()
// 	oldPrice?: number;
// 	@IsNumber()
// 	brandId?: number;
// 	@IsNumber()
// 	modelDeviceId?: number;
// 	@IsString()
// 	@IsArray()
// 	tags?: Tag[];
// 	@IsNumber()
// 	@IsArray()
// 	rating?: Rating[];
// 	@IsArray()
// 	Comment?: Comment[];
// }
export class ProductCreate {
	@IsString()
	secondLevelCategoryId: string;
	@IsString()
	name: string;
	@IsNumber()
	price: number;
	@IsOptional()
	@IsNumber()
	oldPrice?: number;
	@IsString()
	brandId: string;
	@IsString()
	TagId: string;
	@IsString()
	modelDeviceId: string;
}
export class BrandDevice {
	@IsString()
	name: string;
}
export class ModelDeviceDto {
	@IsString()
	name: string;
}
export class Rating {
	UserId: number;
	ProductId: number;
}
export class Comment {
	@IsString()
	comment: string;
	@IsNumber()
	writtenById: number;
	@IsNumber()
	productId: number;
}
export class Tag {
	@IsString()
	tag: String;
	@IsNumber()
	@IsArray()
	ProductID: number[];
}
