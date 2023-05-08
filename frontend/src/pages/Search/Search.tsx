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
  const founded = useAppSelector<ProductModel[]>(
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
      {/*<div className={"absolute my-24"}>*/}
      {/*    <FilterContainer />*/}
      {/*</div>*/}
      {/*<Htag type={'h1'}>Результат поиска</Htag>*/}
      {/*<div className={"max-[574px]:text-center min-[920px]:grid gap-40px gap-y-6 grid-cols-2 justify-items-stretch"}>*/}
      {/*    {*/}
      {/*        founded && founded.length>0 ? founded.map(m => {  return m.product.map( p => {     const pict = p.image.split(',');         return (<PhoneCard alias={p.alias} key={p.name} name={p.name + `\r${p.ColorAlias}`} img={`${api_url}/product/${m.brand.name}/${m.name.replace(" ", "-")}/${p.ColorAlias}/${pict[0]}`} price={p.price} />)}); }) :*/}
      {/*            <div className={" text-center my-20 m-auto"}>        <Htag type={'h1'}>К сожалению ничего не найдено</Htag><Button>Вернуться на главную</Button></div>*/}

      {/*    }*/}
      {/*</div>*/}
    </div>
  );
};
export default SearchPage;
