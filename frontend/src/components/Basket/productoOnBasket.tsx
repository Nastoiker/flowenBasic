import {useState} from "react";
import {phoneProps} from "../Product/Phone/phone.props";
import {PhoneCardMini} from "./PhoneCard.mini";
import {productOnBasketProps} from "./productOnBasket.props";

export const ProductoOnBasket = ({basket}: productOnBasketProps) => {
    return (
        basket.map( b =>  <PhoneCardMini  key={b.id} basket={b}/>)
    );
};
{/*const*/}