import {useAppDispatch, useAppSelector} from "../../store";
import {useEffect, useMemo, useState} from "react";
import {getProducts} from "../../store/product.slice";
import {getPhonesFetch} from "../../store/slices/phones.slices";
import {PhoneCard} from "../../components/Product/Card/phone.card";
import {api_url} from "../../../domen.api";
import {FilterByPrice} from "../../components/Filters/FilterByPrice";
import { ProductModel, SmartPhone} from "../../../interfaces/product.interfaces";
import {FilterContainer} from "../../components/Filters/Filter.container";
 interface byPrice {
    phones: ProductModel[],
     minPrice: number,
     maxPrice: number
}
const ByPrice = (payload: byPrice) => {
    const models:ProductModel[] = [];
    for( const model of payload.phones) {
        const thisModel = model;
        const phones: SmartPhone[] = [];
        for(const phone of model.product) {
            if(phone.price > payload.minPrice && phone.price < payload.maxPrice ) {
                phones.push(phone);
            }
        }
        thisModel.product = phones;
        console.log(phones);
        models.push(thisModel);
    }
    return models;
};
const Phones = ():JSX.Element => {
    const dispatch = useAppDispatch();
    const [filter, setFilter]  = useState<boolean>();
    useEffect(() => {
        dispatch(getPhonesFetch());
    }, []);
    const phones = useAppSelector(state => state.phone.filtered);
    // const models = useMemo(() => { dispatch(getPhonesFetch());}, [filter, dispatch]);
    console.log(phones);
    return (<div  className={"max-[574px]:text-center min-[920px]:grid gap-40px gap-y-6 grid-flow-col justify-items-stretch"}>
        <FilterByPrice  />
        <FilterContainer />
        { phones.map(m => {  return m.product.map( p => {     const pict = p.image.split(',');         return (<PhoneCard alias={p.alias} key={p.name} name={p.name + `\r${p.ColorAlias}`} img={`${api_url}/product/${m.brand.name}/${m.name.replace(" ", "-")}/${p.ColorAlias}/${pict[0]}`} price={p.price} />)}); }) }
    </div>);
};
export default Phones;