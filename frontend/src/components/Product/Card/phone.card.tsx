import { Button } from "../../../ui/button";
import { PhoneCardProps } from "./phone.card.props";
import { useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect, useState } from "react";
import { Authorization, NotifyAuth } from "../../notifications/notify";
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
  const user = useAppSelector((state) => state.user.user);
  const basket = useAppSelector((state) => state.basket.basket);
  const [ProductBasket, setProductBasket] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [errorBasket, setErrorBasket] = useState<boolean>(false);
  const [basketId, setBasketId] = useState<string>();
  useEffect(() => {
    if (basket.length > 0) {
      setProductBasket(true);
      const basketIdFound = basket.find((b) => b.productId === id);
      if (basketIdFound) {
        setBasketId(basketIdFound.id);
      }
    } else {
      setProductBasket(false);
    }
  }, []);
  const redirectTo = (to: string) => {
    navigate("../../product/phone/" + to, { replace: true });
  };
  const addBasket = () => {
    if (user.login.length === 0) {
      setErrorBasket(true);
      return;
    } else {
      if (ProductBasket) {
        dispatch(deleteBasket({ id: basketId }));
      } else {
        dispatch(addBasketFetch({ productId: basketId }));
      }

      setProductBasket((b) => !b);
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
      <h1 className={"line-through"}>{oldPrice} ₽</h1>
      {ProductBasket ? (
        <Button onClick={() => addBasket()}>Убрать из корзины </Button>
      ) : (
        <Button onClick={() => addBasket()}>Добавить в корзину </Button>
      )}
      {errorBasket && <NotifyAuth />}
    </div>
  );
};
