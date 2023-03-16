import {Htag} from "../Htag/Htag";
import {productOnBasketProps} from "./productOnBasket.props";
import {useEffect, useState} from "react";
import {DOMEN} from "../../../domen.api";
import {useAppDispatch} from "../../store";
import {deleteBasket, editBasketFetch} from "../../store/slices/basket.slice";
import {productMiniOnBasketProps} from "./PhoneCard.mini.props";
import {convertDate} from "../../helper/convertDate";
import {Button} from "../../ui/button";

export const PhoneCardMini = ({basket}: productMiniOnBasketProps) => {
    const [countProduct, setCountProduct] = useState<number>(basket.quantity);
    const dispatch = useAppDispatch();
    const editBasket = async ( value: number) => {
       setCountProduct(c => c + value);
       dispatch(editBasketFetch({ id: basket.id, quantity: countProduct + value}));
    }
    return (<div className={"m-5"}>
    <img src="" alt=""/>
       <Htag type={"h1"}>{basket.product.name}</Htag>
        <span>{convertDate(basket.createdAt)}</span>
        <div><button onClick={() => countProduct > 1 && editBasket(-1)}>-</button><span>{countProduct}</span><button onClick={() =>  editBasket(+1)}>+</button></div>
        <Button onClick={() => dispatch(deleteBasket({id: basket.id}))}>Удалить</Button>
    </div>);
};