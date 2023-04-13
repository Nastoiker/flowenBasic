import {useState} from "react";
import {Button} from "../../ui/button";
import {FilterWithAction} from "./FilterWithAction";
import {FilterByPrice} from "./FilterByPrice";

export const FilterContainer = () => {
    const [show, setShow] = useState<boolean>();
    return <>
        <Button onClick={() => setShow((c )=> !c )}>Фильтры</Button>
        {
            show && <div className={"z-50 p-10 space-ys-5 bg-white"}>
                <FilterWithAction />
                <FilterByPrice className={"space-x-5"} />

            </div>
        }
    </>;
}