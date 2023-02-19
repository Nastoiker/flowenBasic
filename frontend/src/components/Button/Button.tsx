import {FC, ReactNode} from "react";
import cn from 'classnames';
import styles from './button.module.css';
// import BasketIcon from './basket.svg';
import {buttonProps} from "./button.props";
export const Button = ({children, className, appearance='green', ...props }:buttonProps) =>{
    return (
    <button className={cn(className, [{
        [styles.ghost]: appearance == 'ghost',
        [styles.green]: appearance == 'green',
    },
        {...props}
    ])}>{children} </button>
    );
};