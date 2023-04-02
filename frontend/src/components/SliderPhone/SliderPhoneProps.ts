import {DetailedHTMLProps, HTMLAttributes} from "react";
import {ProductModel} from "../../../interfaces/product.interfaces";

export interface SliderPhoneProps  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    products:    ProductModel[],
}