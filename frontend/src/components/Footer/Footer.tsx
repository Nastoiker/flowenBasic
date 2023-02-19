import { format } from 'date-fns';
import {FooterProps} from "./Footer.props";
import {Input} from "../../ui/input";
import {Htag} from "../Htag/Htag";
export const Footer = ({className, ...props}: FooterProps): JSX.Element => {
    return (<footer>
        <div>
            <Htag type={"h2"}>
                Хотите первым узнавать о скидках в FLOVEN?
            </Htag>
            <Input type="email" placeholder="Email" />
        </div>
        <h1>© 2004–2022 Группа компаний «FLOVEN»</h1>
        <a href="frontend/src/components/Footer#" target ="_blank">
            Пользовательское соглашение
        </a>
        <a href="frontend/src/components/Footer#" target ="_blank">
            Правовые условия пользования сайтом
        </a>
    </footer>);
}