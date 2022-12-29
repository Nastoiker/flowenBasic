import {SearchProps} from "./Search.props";
import cn from "classnames";
import styles from './Search.module.css';
import {useState, KeyboardEvent } from "react";
import {Button} from "../Button/Button";
import SearchIcon from './search.svg';
import {useRouter} from "next/router";

export const Search = ({ className, children, ...props}: SearchProps): JSX.Element => {
   return (<form action="">
      <input type="text"/>
   </form>);
};