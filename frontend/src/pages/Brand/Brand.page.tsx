import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";
import {
  ProductModel,
  SmartPhone,
} from "../../../interfaces/product.interfaces";
import { PhoneCard } from "../../components/Product/Card/phone.card";
import { getFounded, setSearch } from "../../store/slices/search.slice";
import { api_url } from "../../../domen.api";
import { Htag } from "../../components";
import { Button } from "../../ui/button";
import { FilterContainer } from "../../components/Filters/Filter.container";
import { FilterLayoutPhone } from "../../page-component/FilterLayoutPhone";
import {
  getPhonesByBrand,
  getPhonesFetch,
} from "../../store/slices/phones.slices";
import { BrandPath } from "../../helper/convertImagePath";

const BrandPage = () => {
  const dispatch = useAppDispatch();
  const { brand } = useParams();
  const value = brand?.split(":")[1];
  useEffect(() => {
    dispatch(getPhonesByBrand(value));
  }, [dispatch]);
  const phones = useAppSelector((state) => state.phone.filtered);
  console.log(phones);
  if (!phones || !value)
    return (
      <div className={" text-center my-20 m-auto"}>
        {" "}
        <Htag type={"h1"}>К сожалению ничего не найдено</Htag>
        <Button>Вернуться на главную</Button>
      </div>
    );
  const imgBrand = BrandPath(value);
  return (
    <div>
      <FilterLayoutPhone
        phones={phones.map((m) => m.product.map((p) => p)).flat()}
        text={value!}
        img={imgBrand}
      />
    </div>
  );
};
export default BrandPage;
