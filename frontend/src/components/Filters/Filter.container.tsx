import {useState} from "react";
import {Button} from "../../ui/button";
import {FilterWithAction} from "./FilterWithAction";

export const FilterContainer = () => {
    const [show, setShow] = useState<boolean>();
    return <>
        <Button onClick={() => setShow((c )=> !c )}>Фильтры</Button>
        {
            show && <div>
                <FilterWithAction />

            </div>
        }
    </>;
}