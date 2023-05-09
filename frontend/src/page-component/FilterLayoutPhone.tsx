import { ProductModel, SmartPhone } from "../../interfaces/product.interfaces";
import {useEffect, useMemo, useState} from "react";
import Slider from "rc-slider";
import { Input } from "../components/Input/Input";
import { Button } from "../ui/button";
import "rc-slider/assets/index.css";

import { getByPrice } from "../store/slices/phones.slices";
import { FilterWithAction } from "../components/Filters/FilterWithAction";
import { FilterByPrice } from "../components/Filters/FilterByPrice";
import { PhoneCard } from "../components/Product/Card/phone.card";
import { api_url } from "../../domen.api";
import { Htag } from "../components";
import { ProductConvertImageNotModel } from "../helper/convertImagePath";
import { ReactComponent as FilterIcon } from "./filter.svg";
import { Checkbox } from "../ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "react-router-dom";
export const FilterLayoutPhone = ({
  phones,
  text,
  img,
}: {
  phones: SmartPhone[];
  text: string;
  img?: string;
}) => {
  const [valueMax, setValueMax] = useState<number>(
    Math.max(...phones.map((p) => p.price))
  );
  const [valueMin, setValueMin] = useState<number>(
    Math.min(...phones.map((p) => p.price))
  );
  const [filteredPhones, setFilteredPhones] = useState<SmartPhone[]>(phones);
  const navigate = useNavigate();
  const changeFilteredPhone = (minPrice: number, maxPrice: number) => {
    const models: SmartPhone[] = [];
    console.log(minPrice, maxPrice);
    for (const model of phones) {
      if (model.price >= minPrice && model.price <= maxPrice) {
        models.push(model);
      }
      console.log(1);
    }
    setFilteredPhones(models);
  };
  const redirectTo = (to: string) => {
    navigate(to, { replace: true });
  };
  const filterWithAction = () => {
    setFilteredPhones(filteredPhones.filter((f) => f.oldPrice > f.price));
  };
  const handleChange = ([low, high]: number[]) => {
    if (
      low > valueMax ||
      low === valueMax ||
      high === valueMin ||
      high < valueMin
    )
      return;
    setValueMin(low);
    setValueMax(high);
    if (!onchange) {
      return console.log("please pass onChange method to LogarithmicRange");
    }
  };
  if (!phones || phones.length === 0) {
    return (
      <div className={"text-center my-20 justify-self-center"}>
        {" "}
        <Htag type={"h1"}>К сожалению ничего не найдено</Htag>
        <Button onClick={() => redirectTo("/")}>Вернуться на главную</Button>
      </div>
    );
  }
  const [show, setShow] = useState<boolean>();
  return (
    <div className={""}>
      <div className={"absolute my-20"}>
        <Button
          className="l-0"
          variant="ghost"
          onClick={() => setShow((c) => !c)}
        >
          <FilterIcon />
        </Button>
        {show && (
          <div className={"z-50 rounded-2xl  p-10 space-ys-5 bg-white"}>
            <div className="space-y-2">
              <h1>Цена</h1>
              <Slider
                range
                allowCross={true}
                value={[valueMin, valueMax]}
                step={1000}
                min={Math.min(...phones.map((p) => p.price))}
                max={Math.max(...phones.map((p) => p.price))}
                onChange={handleChange}
              />

              {/*<Input type="range" min={'10000'} max={'200000'} step={'500'} value={value} onChange={(e) => setValue(e.target.value)}/>*/}
              <div className={"space-y-5 py-5"}>
                <Input
                  onChange={(e) => {
                    setValueMin(e.target.value);
                  }}
                  value={valueMin}
                />
                <Input
                  onChange={(e) => {
                    setValueMax(e.target.value);
                  }}
                  value={valueMax}
                />
              </div>
              <div className="space-x-2 flex items-center">
                <Checkbox
                  id="withAction"
                  onClick={() => {
                    filterWithAction();
                  }}
                />
                <Label htmlFor="withAction">Со скидкой</Label>
              </div>
              <Button
                onClick={() => {
                  changeFilteredPhone(valueMin, valueMax);
                }}
              >
                Сохранить
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <img src={img} alt="" />
        <Htag type={"h1"}>{text}</Htag>
      </div>
      <div
        className={
          "max-[574px]:text-center min-[720px]:grid gap-40px gap-y-6 grid-cols-2 justify-items-stretch"
        }
      >
        {filteredPhones && filteredPhones.length > 0 ? (
          filteredPhones.map((p) => (
            <PhoneCard
              alias={p.alias}
              key={p.name}
              oldPrice={p.oldPrice}
              name={p.name + `\r${p.ColorAlias}`}
              img={ProductConvertImageNotModel(p)}
              price={p.price}
            />
          ))
        ) : (
          <div className={"text-center my-20 justify-self-center"}>
            {" "}
            <Htag type={"h1"}>К сожалению ничего не найдено</Htag>
            <Button onClick={() => redirectTo("/")}>
              Вернуться на главную
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
