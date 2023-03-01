import {Htag} from "../Htag/Htag";
import {productOnBasketProps} from "./productOnBasket.props";

export const PhoneCardMini = ({phone, count}: productOnBasketProps) => {
    return (<div>
    <img src="" alt=""/>
       <Htag type={"h1"}>{phone.name}</Htag>
        <span>{count}</span>
    </div>);
};