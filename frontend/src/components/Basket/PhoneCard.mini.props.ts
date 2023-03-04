import {DetailedHTMLProps, HTMLAttributes} from "react";
import {SmartPhone} from "../../../interfaces/product.interfaces";
import {Basket} from "../../store/slices/basket.slice";

export interface productMiniOnBasketProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    basket: Basket;
    // onChangeMinus: () => void,
    //
    // onChangeAdd:  () => void,
}