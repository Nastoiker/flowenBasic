import {useAppDispatch, useAppSelector} from "../../store";
import {useEffect} from "react";
import {getProducts} from "../../store/product.slice";

const Phones = ():JSX.Element => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, []);
    const phones = useAppSelector(state => state.product.product);
    return <div>
        {phones.map(p => (<h1 key={p.name}>{p.name}</h1>))}
    </div>
}
export default Phones;