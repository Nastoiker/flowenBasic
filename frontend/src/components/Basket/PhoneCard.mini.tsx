import {Htag} from "../Htag/Htag";
import {productOnBasketProps} from "./productOnBasket.props";
import {useEffect, useState} from "react";
import {DOMEN} from "../../../domen.api";
import {useAppDispatch} from "../../store";
import {deleteBasket, editBasketFetch} from "../../store/slices/basket.slice";
import {productMiniOnBasketProps} from "./PhoneCard.mini.props";
import {convertDate} from "../../helper/convertDate";
import {Button} from "../../ui/button";
import {ProductConvertImageNotModel, ProductImagePath} from "../../helper/convertImagePath";

export const PhoneCardMini = ({basket}: productMiniOnBasketProps) => {
    const [countProduct, setCountProduct] = useState<number>(basket.quantity);
    const dispatch = useAppDispatch();
    const editBasket = async ( value: number) => {
       setCountProduct(c => c + value);
       dispatch(editBasketFetch({ id: basket.id, quantity: countProduct + value}));
    };
    const getImage = ProductConvertImageNotModel(basket.product);
    return (<div className={"m-5 space-y-5"}>
        <div className={"flex  items-center justify-between"}>
            <Htag type={"h1"}>{basket.product.name}</Htag>
            <span>{convertDate(basket.createdAt)}</span>
        </div>
        <div className={"flex items-center justify-between"}>
            <img className="w-30 mx-5 h-14 rounded-md" width={30} height={70} src={getImage} alt=""/>

            <div>
                <div className={"bg-white rounded-3xl space-x-5"}><button className=" h-4 w-4" onClick={() => countProduct > 1 && editBasket(-1)}>-</button><span>{countProduct}</span><button onClick={() =>  editBasket(+1)}>+</button></div>
                <Button onClick={() => dispatch(deleteBasket({id: basket.id}))}>Удалить</Button>
            </div>
        </div>

    </div>);
};