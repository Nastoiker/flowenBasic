import {useState} from "react";
import {phoneProps} from "../Product/Phone/phone.props";
import {PhoneCardMini} from "./PhoneCard.mini";
import {productOnBasketProps} from "./productOnBasket.props";

export const ProductoOnBasket = (phoneBasket: productOnBasketProps[]) => {

    return (
        phoneBasket.map( p =>  <PhoneCardMini phone={p.phone} count={p.count} onChangeMinus={()=>setCountProduct(c => c - 1)} onChangeAdd={() =>setCountProduct(c => c + 1) }/>)
    );
};
{/*const*/}