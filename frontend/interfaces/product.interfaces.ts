export interface Brand {
    id: string;
    name: string;
}

export interface Comment {
    id: string;
    createdAt: Date;
    comment: string;
    writtenById: string;
    productId: string;
}
export interface SmartPhone {
    id: string,
    name: string,
    price: string,
    oldPrice: number,
    TagId: string,
    brandId: string,
    Color: string,
    Description: string,
    image: string | null,
    Memory: number,
    Ram: number,
    modelDeviceId: string,
    quantity: string,
}
export interface ProductModel {
    id: string;
    name: string;
    secondCategoryId: string;
    price: number;
    oldPrice: number | null;
    TagId: string;
    brandId: string;
    modelDeviceId: string;
    brand: Brand;
    Comment: Comment[];
    smartphones?: SmartPhone[];
}
export interface  secondLevelCategory {
    id: string,
    name: string,
    firstLevelId: string
}
export interface  Category {
    id: string,
    name: string,
    secondLevelCategory: secondLevelCategory[];
}
export interface Product {
    firstLevelCategory: string;
    secondLevelCategory: string;
    name: string;
    price: number;
    oldPrice: number;
    brandId: string;
    modelDeviceId: string;
    TagId: string;
}