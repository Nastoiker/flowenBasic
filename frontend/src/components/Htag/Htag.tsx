import {FC} from "react";
import {htagProps} from "./htag.props";

export const Htag: FC<htagProps> = ({type, children}) => {
    switch(type) {
        case 'h1':
            return  <h1>{ children}</h1>;
        case 'h2':
            return  <h2>{ children}</h2>;
        case 'h3':
            return <h3>{ children}</h3>;
        default:
            return <h1>{ children}</h1>;
    }
};

