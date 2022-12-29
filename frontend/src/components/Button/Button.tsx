import {FC} from "react";
import {buttonProps} from "./button.props";
import cn from 'classnames';
import styles from './button.module.css';
import BasketIcon from './basket.svg';
export const Button: FC<buttonProps> = ({children,className,appearance='green', ...props }) =>{
    return (
    <button className={cn(className, [{
        [styles.ghost]: appearance == 'ghost',
        [styles.green]: appearance == 'green',
    },
        {...props}
    ])}>{children} <BasketIcon /></button>
    );
};