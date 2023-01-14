import {Link} from "react-router-dom";
import {useAppSelector} from "../../store";

export const Menu = ():JSX.Element => {
    const categoryes = useAppSelector(state => state.firstCategory.category);
    return (<nav>
        categoryes
        {/*<Link to={''} ></Link>*/}
        {/*<Link to={''} ></Link>*/}
        {/*<Link to={''} ></Link>*/}
        {/*<Link to={''} ></Link>*/}
    </nav>)
}