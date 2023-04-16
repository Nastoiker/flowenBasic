import {useLocation, useParams} from "react-router-dom";
import NotFound from "../NotFound";
import {useEffect, useState} from "react";
import {ModelDevice, SmartPhone} from "../../../interfaces/product.interfaces";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import {Phone} from "../../components/Product/Phone/phone";
import {setCurrentModel} from "../../store/slices/phones.slices";
import {useAppDispatch, useAppSelector} from "../../store";
import {DetailsSkeleton} from "./Details.skeleton";

const Details =  (): JSX.Element => {
    const { id } = useParams();
    const [phone, setPhone] = useState<SmartPhone>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pictures, setPicture] = useState<string>();
    function handleClick() {
        history.back(); // переход на предыдущую страницу
    }
    // const [currentModel, setCurrentModel] = useState('string');
    const dispatch = useAppDispatch();
    // const user = useAppSelector(state => state.)
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
        <button onClick={handleClick}>Назад</button>
        {isLoading ? (phone && <Phone smartPhone={ phone } currentModel={model!}/>): <DetailsSkeleton  />}
    </div>);
};
export default Details;