import {useAppDispatch, useAppSelector} from "../../store";
import {useEffect, useMemo, useState} from "react";
import {getProducts} from "../../store/product.slice";
import {getPhonesFetch} from "../../store/slices/phones.slices";
import {PhoneCard} from "../../components/Product/Card/phone.card";
import {api_url} from "../../../domen.api";
import {FilterByPrice} from "../../components/Filters/FilterByPrice";
import { ProductModel, SmartPhone} from "../../../interfaces/product.interfaces";
import {FilterContainer} from "../../components/Filters/Filter.container";
import {FilterLayoutPhone} from "../../page-component/FilterLayoutPhone";
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
    return (<div>
        <FilterLayoutPhone phones={phones.map( m => m.product.map( p => p )).flat()} text={'Телефоны'}/>
    </div>);
};
export default Phones;