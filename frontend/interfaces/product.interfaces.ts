export interface Brand {
    id: string;
  name: string;
  img: string;
}

export interface Comment {
    id: string;
    createdAt: Date;
    comment: string;
    writtenById: string;
    modelDeviceId: string;
    title: string;
    pictures?: string;
}
export interface SmartPhone {
    id: string,
    name: string,
    price: number,
    alias: string,
    oldPrice: number,
    TagId: string,
    brandId: string,
    Color: string,
    ColorAlias: string,
    brand: Brand,
    modelDevice: ModelDevice,
    Description: string,
    image: string,
    Memory: number,
    Ram: number,
    modelDeviceId: string,
    quantity: string,
}
export interface Rating {
    id: string,
    createdAt: string,
    number: number,
    writtenById: string,
    modelDeviceId: string,
}
export interface ModelDevice {
    id: string,
    name: string,
    secondCategoryId: string,
    brandId: string,
    Comment?: Comment[],
    rating?: Rating[],
}
export interface ProductModel {
    rating: Rating[],

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
    product: SmartPhone[];
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
export interface Profile {
    id: string;
    login: string;
    phone?: string | null;
    avatar?: string | null;
    isActive: boolean;
    Comment: Comment[];
}
export interface  Tag {
    id: string,
    name: string,
}