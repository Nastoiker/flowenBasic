import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store";
import {useEffect, useState} from "react";
import {getSecondCategory, SetCurrentCategory} from "../../store/SecondCategory.slice";
import {getFirstCategory} from "../../store/firstCategory.slice";
import {SecondMenu} from "./SecondMenu";

interface IMenu {
    name: string,
    children?: IMenu[];
}

export const Menu = ():JSX.Element => {
    const category = useAppSelector(state => state.firstCategory.category);
    const dispatch = useAppDispatch();
    const setDispatch = (id: string, name: string) => {
        dispatch(getSecondCategory(id));
        setCurrentCategory(name);
        // setTimeout(     () => setCurrentCategory(name);, 1000);
    };
    useEffect(() => {
        dispatch(getFirstCategory());
    }, [dispatch]);
    const [currentCategory, setCurrentCategory] = useState<string>('');


    return (<nav>

        { category.map( c =>  {
                return (
            <div key={c.id} onClick={() => setDispatch(c.id, c.alias)}>{c.name}{  c.alias === currentCategory && <SecondMenu  onShow={() => setCurrentCategory('')} firstCategoryId={c.id} firstCategoryAlias={c.alias} /> }</div>
            );
        }
        )};
    </nav>);
}