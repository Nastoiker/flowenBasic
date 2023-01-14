import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store";
import {useState} from "react";
import {getSecondCategory} from "../../store/SecondCategory.slice";
interface IMenu {
    name: string,
    children?: IMenu[];
}

export const Menu = ():JSX.Element => {
    const category = useAppSelector(state => state.firstCategory.category);
    const dispatch = useAppDispatch();
    const currentClicked = useState<string>('');
    // let menu:IMenu[] = [];
    // for(let i = 0; i < category.length; i++ ) {
    //     let secondMenu:IMenu[] = [];
    //     secondCategory.forEach( s => {
    //         if(s.firstLevelId === category[i].id) {
    //             secondMenu.push({name: s.name})
    //         };
    //     });
    //     let secondEdit = second.map( s => {
    //         delete s.id
    //     })
    //     if(second) {
    //         menu[i] = {name: category[i].name, children: second,  },};
    //     } else {
    //         menu[i] = {name: category[i].name};
    //     }
    // }

    return (<nav>
        {category.map( c =>  {
                dispatch(getSecondCategory(c.id));
                const secondCategory = useAppSelector(state => state.secondCategory.category);
                return (
            <div key ={ c.id}>{c.name}{}</div>
            )
        }
        )}
        {/*<Link to={''} ></Link>*/}
        {/*<Link to={''} ></Link>*/}
        {/*<Link to={''} ></Link>*/}
        {/*<Link to={''} ></Link>*/}
    </nav>);
}