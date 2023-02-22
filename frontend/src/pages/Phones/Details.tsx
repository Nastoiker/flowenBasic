import {useParams} from "react-router-dom";
import NotFound from "../NotFound";
import {useEffect, useState} from "react";
import {ModelDevice, SmartPhone} from "../../../interfaces/product.interfaces";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import {Phone} from "../../components/Product/Phone/phone";
import {setCurrentModel} from "../../store/slices/phones.slices";
import {useAppDispatch, useAppSelector} from "../../store";


const Details =  (): JSX.Element => {
    const { id } = useParams();
    const [phone, setPhone] = useState<SmartPhone>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    useEffect(   () => {
        (async () => {
            const res = await fetch(  `http://localhost:8000/product/findByAlias:${id}`);
            const mobile = await res.json();
            await new Promise((resolve) => setTimeout(() => resolve(''), 1000));
            if(!mobile) {
                return;
            } else {
                dispatch(setCurrentModel(mobile.modelDevice.id));
                setPhone(mobile);
                setIsLoading(true);
            }
        })() ;
    });
    const model = useAppSelector(state => state.phone.currentModel);
    return (<div>
        {isLoading ? (phone && <Phone phone={ phone } currentModel={model!}/>): <Skeleton  width={300} height={700} borderRadius={'2rem'}/>}
    </div>);
};
export default Details;