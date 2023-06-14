import { Button } from "../../../ui/button";
import { PhoneCardProps } from "./phone.card.props";
import { useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect, useState } from "react";
import {
  addBasketFetch,
  deleteBasket,
} from "../../../store/slices/basket.slice";
import { AnimatePresence, motion } from "framer-motion";
import { Htag } from "../../Htag/Htag";
import { AlertDialog } from "../../../ui/alert-dialog";
export const PhoneCard = ({
  className,
  name,
  img,
  price,
  alias,
  oldPrice,
  id,
}: PhoneCardProps): JSX.Element => {
  const location = useLocation();
  const picture = img;
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user!);
  const basket = useAppSelector((state) => state.basket.basket);
  const [ProductBasket, setProductBasket] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [errorBasket, setErrorBasket] = useState<boolean>(false);
  const [basketId, setBasketId] = useState<string | null>();
  useEffect(() => {
    if (basket.length > 0) {
      const basketIdFound = basket.find((b) => b.productId === id);
      console.log(basketIdFound);
      if (basketIdFound) {
        setProductBasket(true);
        setBasketId(basketIdFound.id);
      } else {
        setProductBasket(false);
      }
    }
  }, [dispatch, ProductBasket]);
  const redirectTo = (to: string) => {
    navigate("../../product/phone/" + to, { replace: true });
  };
  const addBasket = () => {
    if (user.login.length === 0) {
      setErrorBasket(true);
      return;
    } else {
      if (basketId) {
        dispatch(deleteBasket({ id: basketId }));
        setBasketId(null);

        setProductBasket(false);
      } else {
        console.log(id);
        dispatch(addBasketFetch({ id: id, quantity: 1 }));
        const check =
            basket.length > 0 &&
            basket?.find((b) => b.productId === id);
        if(!check) return;
        setBasketId(check.id ?? null);
        setProductBasket(true);
      }


    }
  };
  return (
    <div
      key={"modal"}
      className={cn(
        className,
        " text-center hover:scale-110 hover:shadow-xl pb-6 mx-auto  transition-all duration-300 inline-block z py-10 space-y-2 w-72 justify-items-center "
      )}
    >
      <img
        onClick={() => redirectTo(alias)}
        className="rounded-3xl h-56 mx-auto"
        src={picture}
        alt="pictureCard"
      />
      <h1 className="font-bold text-xl">{name}</h1>
      <h1 className="font-bold "> {price} ₽</h1>
      <Button onClick={() => redirectTo(alias)}>Посмотреть подробнее</Button>
      {/*<h1 className={"line-through"}>{oldPrice} ₽</h1>*/}
      {/*{basketId ? (*/}
      {/*  <Button onClick={() => addBasket()}>Убрать из корзины </Button>*/}
      {/*) : (*/}
      {/*  <Button onClick={() => addBasket()}>Добавить в корзину </Button>*/}
      {/*)}*/}
      {/*{errorBasket && <NotifyAuth />}*/}
    </div>
  );
};
