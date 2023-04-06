import {useState} from "react";
import {phoneProps} from "../Product/Phone/phone.props";
import {PhoneCardMini} from "./PhoneCard.mini";
import {productOnBasketProps} from "./productOnBasket.props";

export const ProductoOnBasket = ({basket}: productOnBasketProps) => {
    return (
        <div className={"bg-white absolute z-10 rounded-3xl space-y-6"}>

            { basket.length>0 ? basket.map( b =>  <PhoneCardMini  key={b.id} basket={b}/>) : <div>Авторизируйтесь</div>}

        </div>
    );
};
{/*const*/}