import { IsArray, IsNumber, IsString, IsOptional, IsDate, IsBoolean } from 'class-validator';
import { UserModel } from '@prisma/client';
export class ProductModel {
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
	@IsNumber()
	Ram?: number;
	@IsNumber()
	Memory?: number;
	@IsString()
	color?: string;
	@IsString()
	image: string;
	@IsNumber()
	quantity: number;
	@IsString()
	modelDeviceId: string;
}
export class Basket {
	@IsString()
	productId: string;
	@IsBoolean()
	buying: boolean;
	@IsString()
	userId: string;
	@IsString()
	boughtProductId: string;
	@IsNumber()
	quantity: number;
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
	@IsString()
	secondCategoryId: string;
	@IsString()
	brandId: string;
}
export class Rating {
	@IsString()
	writtenById: string;
	@IsString()
	modelDeviceId: string;
	@IsNumber()
	number: number;
}
export class Comment {
	@IsString()
	comment: string;
	@IsString()
	writtenById: string;
	@IsString()
	modelDeviceId: string;
	@IsString()
	pictures: string;
	@IsString()
	title: string;
}
export class Tag {
	@IsString()
	tag: String;
	@IsString()
	@IsArray()
	ProductID: string[];
}
export interface brandOnSecondCategory {
	brand: { connect: { id: string } };
}
export class BrandForSecond implements brandOnSecondCategory {
	brand: { connect: { id: string } };
	constructor(id: string) {
		this.brand.connect.id = id;
	}
}