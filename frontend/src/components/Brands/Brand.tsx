import  cn  from "classnames";
import { BrandProps } from "./BrandProps"
import { useNavigate } from "react-router-dom";

export const Brand = ({ brand, isActive}: BrandProps) =>{
    const navigate = useNavigate();
    const redirectTo =  (to: string) => {
        navigate('../../../' + to);
    };
  return <div className=""  onClick={() => redirectTo(brand.name)}>
        <image src={brand.img} alt={'brand'} className={cn("rounded-3xl", { "border border-black": isActive })}/>
        <h1>{brand.name}</h1>
    </div>;
}