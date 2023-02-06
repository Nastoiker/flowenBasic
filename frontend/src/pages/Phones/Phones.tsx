import {useAppDispatch, useAppSelector} from "../../store";
import {useEffect} from "react";
import {getProducts} from "../../store/product.slice";
import {getPhonesFetch} from "../../store/slices/phones.slices";

const Phones = ():JSX.Element => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getPhonesFetch());
    }, [dispatch]);
    const phones = useAppSelector(state => state.phone.phones);
    return <div>
        PHONES
        { phones.map(p => (<div key={p.name}>
            <h1 >{p.name}</h1>
            {/*<p>{p.description}</p>*/}
        </div>)) }
    </div>;
};
export default Phones;