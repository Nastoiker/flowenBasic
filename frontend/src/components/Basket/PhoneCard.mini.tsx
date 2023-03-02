import {Htag} from "../Htag/Htag";
import {productOnBasketProps} from "./productOnBasket.props";
import {useEffect, useState} from "react";

export const PhoneCardMini = ({phone, count}: productOnBasketProps) => {
    const [countProduct, setCountProduct] = useState<number>(1);
    useEffect(() => {

    }, countProduct);
    return (<div>
    <img src="" alt=""/>
       <Htag type={"h1"}>{phone.name}</Htag>
        <span>{count}</span>
        <div><button onClick={() => setCountProduct((c => c - 1))}>-</button><span>{count}</span><button onClick={() => setCountProduct((c => c + 1))}>+</button></div>
    </div>);
};