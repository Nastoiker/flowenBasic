import {DetailedHTMLProps, HTMLAttributes} from "react";
import {ModelDevice, ProductModel, SmartPhone} from "../../../../interfaces/product.interfaces";

export interface phoneProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    phone: SmartPhone;
    currentModel: ProductModel,

};