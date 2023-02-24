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
}
export interface ICreateModel {
    name: string;
    secondCategoryId: string;
    brandId: string;
}