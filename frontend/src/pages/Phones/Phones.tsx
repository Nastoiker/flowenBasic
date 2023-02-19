import {useAppDispatch, useAppSelector} from "../../store";
import {useEffect} from "react";
import {getProducts} from "../../store/product.slice";
import {getPhonesFetch} from "../../store/slices/phones.slices";
import {PhoneCard} from "../../components/Product/Card/phone.card";

const Phones = ():JSX.Element => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getPhonesFetch());
    }, [dispatch]);
    const phones = useAppSelector(state => state.phone.phones);
    return <div>
        PHONES
        { phones.map(p => (<PhoneCard name={p.name} img={'sad'} price={p.price} />)) }
    </div>;
};
export default Phones;