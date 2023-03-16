export interface ICreatePhone {
    name: string;
    price: number;
    oldPrice: string | null;
    TagId: string;
    brandId: string;
    alias: string;
    modelDeviceId: string;
    Ram: number;
    Memory: number;
    Color: string;
    ColorAlias: string;
    quantity: number;
    Description: string;
    files: File;
}
export interface ICreateModel {
    name: string;
    secondCategoryId: string;
    brandId: string;
}
export interface ICreateSecondCategoryWithBrand {
    alias: string;
    name: string;
    firstLevelId: string;
    id: string[];
}
export interface  ICreateBrandWithSecondCategory {
    categories: string[],
    name: string,
}
export interface addImageForProduct {
    files: File,
    productId: string,
}