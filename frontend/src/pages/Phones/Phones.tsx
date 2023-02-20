import {useAppDispatch, useAppSelector} from "../../store";
import {useEffect} from "react";
import {getProducts} from "../../store/product.slice";
import {getPhonesFetch} from "../../store/slices/phones.slices";
import {PhoneCard} from "../../components/Product/Card/phone.card";
import {api_url} from "../../../domen.api";

const Phones = ():JSX.Element => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getPhonesFetch());
    }, [dispatch]);
    const phones = useAppSelector(state => state.phone.phones);
    return (<div>
        PHONES
        { phones.map(m => {  return m.product.map( p => {     const pict = p.image.split(',');         return (<PhoneCard key={p.name} name={p.name + `\r${p.ColorAlias}`} img={`${api_url}/product/${m.brand.name}/${p.alias}/${p.ColorAlias}/${pict[0]}`} price={p.price} />)}); }) }
    </div>);
};
export default Phones;