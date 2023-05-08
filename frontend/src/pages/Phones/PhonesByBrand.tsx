import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SmartPhone } from "../../../interfaces/product.interfaces";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  getPhonesByBrand,
  getPhonesFetch,
  setCurrentModel,
} from "../../store/slices/phones.slices";
import { Phone } from "../../components/Product/Phone/phone";
import Skeleton from "react-loading-skeleton";
import { PhoneCard } from "../../components/Product/Card/phone.card";
import { api_url } from "../../../domen.api";

const PhonesByBrand = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // const user = useAppSelector(state => state.)
  useEffect(() => {
    dispatch(getPhonesFetch());
  }, []);
  const phones = useAppSelector((state) => state.phone.phones).filter(
    (b) => b.brand.id === id
  );
  console.log(phones);
  return (
    <div>
      {phones.map((m) => {
        return m.product.map((p) => {
          const pict = p.image.split(",");
          return (
            <PhoneCard
              alias={p.alias}
              key={p.name}
              name={p.name + `\r${p.ColorAlias}`}
              img={`${api_url}/product/${m.brand.name}/${m.name.replace(
                " ",
                "-"
              )}/${p.ColorAlias}/${pict[0]}`}
              price={p.price}
            />
          );
        });
      })}
    </div>
  );
};
export default PhonesByBrand;
