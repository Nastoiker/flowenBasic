import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store";
import {useEffect} from "react";
import {ProductModel, SmartPhone} from "../../../interfaces/product.interfaces";
import {PhoneCard} from "../../components/Product/Card/phone.card";
import {getFounded, setSearch} from "../../store/slices/search.slice";
import {api_url} from "../../../domen.api";

const SearchPage = () => {
    const dispatch = useAppDispatch();
    const { SearchValue } = useParams();
    const phones = useAppSelector(  state => state.phone.phones);
    useEffect(() => {
        // setTimeout(() => {}, 1000);
        dispatch(setSearch(SearchValue));
        dispatch(getFounded(phones));
    }, [dispatch]);
    const founded = useAppSelector<ProductModel[]>(state => state.search.founded);
    console.log(founded);
    return <div>
        {
            founded ? founded.map(m => {  return m.product.map( p => {     const pict = p.image.split(',');         return (<PhoneCard alias={p.alias} key={p.name} name={p.name + `\r${p.ColorAlias}`} img={`${api_url}/product/${m.brand.name}/${m.name.replace(" ", "-")}/${p.ColorAlias}/${pict[0]}`} price={p.price} />)}); }) :
                <div><h1>Не найдено</h1></div>

        }
    </div>;
};
export default  SearchPage;