import {useState} from "react";
import {phoneProps} from "../Product/Phone/phone.props";
import {PhoneCardMini} from "./PhoneCard.mini";

export const ProductoOnBasket = (phoneBasket: phoneProps[]) => {
    const [countProduct, setCountProduct] = useState<number>();

    return (
        phoneBasket.map( p =>  <PhoneCardMini >)
    );
};
const