import { Htag } from "../Htag/Htag";
import { productOnBasketProps } from "./productOnBasket.props";
import { useEffect, useState } from "react";
import { DOMEN } from "../../../domen.api";
import { useAppDispatch } from "../../store";
import { deleteBasket, editBasketFetch } from "../../store/slices/basket.slice";
import { productMiniOnBasketProps } from "./PhoneCard.mini.props";
import { convertDate } from "../../helper/convertDate";
import { Button } from "../../ui/button";
import {
  ProductConvertImageNotModel,
  ProductImagePath,
} from "../../helper/convertImagePath";

export const PhoneCardMini = ({ basket }: productMiniOnBasketProps) => {
  const [countProduct, setCountProduct] = useState<number>(basket.quantity);
  const dispatch = useAppDispatch();
  const editBasket = async (value: number) => {
    setCountProduct((c) => c + value);
    dispatch(
      editBasketFetch({ id: basket.id, quantity: countProduct + value })
    );
  };
  const getImage = ProductConvertImageNotModel(basket.product);
  return (
    <div className={"sm:m-5 w-full space-y-5"}>
      <div className={"flex  items-center justify-between"}>
        <Htag type={"h4"}>{basket.product.name}</Htag>
        <span>{convertDate(basket.createdAt)}</span>
      </div>
      <div className={"flex items-center justify-between"}>
        <div className={"justify-center"}>
          <img
            className="w-30 mx-5 h-14 rounded-md"
            width={30}
            height={70}
            src={getImage}
            alt=""
          />
          <Htag className="mx-auto" type={"h4"}>
            {basket.product.price}
          </Htag>
        </div>
        <div className={"space-y-4"}>
          <div className={"bg-white rounded-3xl  flex justify-around"}>
            <button
              className="rounded-full border h-6 w-6"
              onClick={() => countProduct > 1 && editBasket(-1)}
            >
              -
            </button>
            <span>{countProduct}</span>
            <button
              className="rounded-full border h-6 w-6"
              onClick={() => editBasket(+1)}
            >
              +
            </button>
          </div>
          <Button onClick={() => dispatch(deleteBasket({ id: basket.id }))}>
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};
