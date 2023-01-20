import {PropsWithChildren} from "react";
import {FilterProps} from "./Filter.props";
import {Checkbox} from "../checkbox/Checkbox";
export const Filters = ({ filterBy, className }: FilterProps): JSX.Element => {
    return (
        <div className={className}>
            {/*<ArrowIcon />*/}
            {filterBy.map( f =>
                (     <Checkbox key={f.name} text={f.name}/>)
            )}
        </div>
    );
};