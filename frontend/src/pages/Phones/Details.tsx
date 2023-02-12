import {useParams} from "react-router-dom";
import NotFound from "../NotFound";
import {useEffect, useState} from "react";
import {SmartPhone} from "../../../interfaces/product.interfaces";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import {Phone} from "../../components/Product/Phone/phone";


const Details =  (): JSX.Element => {
    const { id } = useParams();
    const [phone, setPhone] = useState<SmartPhone>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(   () => {
        (async () => {
            const res = await fetch(  `http://localhost:8000/product/findByAlias:${id}`);
            const phone = await res.json();
            await new Promise((resolve) => setTimeout(() => resolve(''), 1000));
            if(!phone) {
                return;
            } else {
                setPhone(phone);
                setIsLoading(true);
            }
        })() ;
    }, []);
    return (<div>
        {isLoading ? (phone && <Phone phone={ phone }/>): <Skeleton  width={300} height={700} borderRadius={'2rem'}/>}
    </div>);
};
export default Details;