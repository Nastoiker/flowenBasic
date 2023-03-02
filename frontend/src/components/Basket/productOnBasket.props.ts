import {DetailedHTMLProps, HTMLAttributes} from "react";
import {SmartPhone} from "../../../interfaces/product.interfaces";

export interface productOnBasketProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    phone: SmartPhone;
    count: number;
    // onChangeMinus: () => void,
    //
    // onChangeAdd:  () => void,
}