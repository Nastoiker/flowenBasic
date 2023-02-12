import {DetailedHTMLProps, HTMLAttributes} from "react";
import {SmartPhone} from "../../../../interfaces/product.interfaces";

export interface phoneProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    phone: SmartPhone;
};