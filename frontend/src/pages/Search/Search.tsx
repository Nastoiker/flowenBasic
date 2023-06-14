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

const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { SearchValue } = useParams();
  const value = SearchValue?.split(":")[1];
  const phones = useAppSelector((state) => state.phone.phones);
  useEffect(() => {
    // setTimeout(() => {}, 1000);
    dispatch(setSearch(value));
    dispatch(getFounded(phones));
  }, [dispatch]);
  const founded = useAppSelector<ProductModel[] | null>(
    (state) => state.search.founded
  );
  console.log(founded);
  if (!founded)
    return (
      <div className={" text-center my-20 m-auto"}>
        {" "}
        <Htag type={"h1"}>К сожалению ничего не найдено</Htag>
        <Button>Вернуться на главную</Button>
      </div>
    );
  return (
    <div>
      <FilterLayoutPhone
        phones={founded.map((m) => m.product.map((p) => p)).flat()}
        text={"Результат поиска"}
      />
    </div>
  );
};
export default SearchPage;
