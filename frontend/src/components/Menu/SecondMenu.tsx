import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store";
import {useEffect} from "react";
import {getSecondCategory} from "../../store/SecondCategory.slice";

export const SecondMenu = ({firstCategoryId, firstCategoryAlias, onShow} : {firstCategoryId: string, firstCategoryAlias: string, onShow: () => void}) => {
    const dispatch = useAppDispatch();
    const secondCategory = useAppSelector(state => state.secondCategory.category);
    useEffect(
        () => {
            dispatch(getSecondCategory(firstCategoryId));
        }, [dispatch]);
    return (

        <div onClick={onShow}>
        {
            secondCategory.map( s => { return ( <Link to={firstCategoryAlias + '/' + s.alias} key={s.id}>{s.name}</Link>); })
        }
    </div>);
};