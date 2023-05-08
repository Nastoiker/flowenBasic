import { SmartPhone } from "../../../interfaces/product.interfaces";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";

export const Basket = (phone: SmartPhone): JSX.Element => {
  const [sum, SetSum] = useState<number>();
  const [quantity, setQuantity] = useState<number>(1);
  const [validate, setValidate] = useState<false>(false);
  return (
    <>
      <div className={"flex"}>
        <div>
          <h1>Корзина</h1>
          <h1></h1>
        </div>
        <div></div>
      </div>
      <div>
        <form action="">
          <h1>Итого</h1>
          <p>Товары</p>
          <p>Скидка</p>
          <h1>Доставка</h1>
          <h3>Дата </h3>
          <h3>Оплата</h3>
          <Button>Оплатить заказ</Button>
        </form>
      </div>
    </>
  );
};
