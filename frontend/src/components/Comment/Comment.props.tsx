import {ModelDevice, ProductModel} from "../../../interfaces/product.interfaces";

export interface CommentProps {
    userId: string;
    images?: string[];
    comment: string;
    date: Date;
    title: string;
    model: ProductModel;
}