import  cn  from "classnames";
import { BrandProps } from "./BrandProps"
import { useNavigate } from "react-router-dom";
import {api_url} from "../../../domen.api";

export const Brand = ({ brand, isActive}: BrandProps) =>{
    const navigate = useNavigate();
    const redirectTo =  (to: string) => {
        navigate('../../../' + to);
    };
    const img = (api_url + brand.img).replace('/uploads', '');
  return <div className="bg-white rounded-3xl w-fit px-5 py-2"  onClick={() => redirectTo(brand.name)}>
        <img src={img} alt={'brand'} className={cn("rounded-3xl", { "border border-black": isActive })}/>
        <h1>{brand.name}</h1>
    </div>;
}