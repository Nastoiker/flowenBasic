import {SearchProps} from "./Search.props";
import cn from "classnames";
import styles from './Search.module.css';
import {useState, KeyboardEvent } from "react";
import {Button} from "../Button/Button";
import {redirect, useNavigate} from 'react-router-dom';
// import  * as SearchIcon  from './search.svg';
import {Input} from "../Input/Input";
import {useAppDispatch, useAppSelector} from "../../store";
import { SmartPhone } from "../../../interfaces/product.interfaces";
import {getFounded, setSearch} from "../../store/slices/search.slice";
export const Search = ({ className, ...props}: SearchProps): JSX.Element => {
   const dispatch = useAppDispatch();
   const phones = useAppSelector(state => state.phone.phones);
   const [searchAlias, setSearchAlias] = useState<string>('');
   const navigate = useNavigate();
    const redirectTo =  (to: string) => {
        navigate(to);
    };
   const goToSearch = () => {
       return redirectTo('/Search/' + searchAlias);
   };
   const handleKeyDown = (e: KeyboardEvent) => {
       if(e.key=='Enter') {
         goToSearch();
      }
   };
   const handleChange = (e: any) => {
       const search = e.target.value;
       setSearchAlias(search);
       dispatch(setSearch(searchAlias));
       dispatch(getFounded(phones));
   }
   return (<form  className={"flex w-full"} {...props} role={'search'}>
     <Button appearance='green' className={"rounded-r-xl"}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" className="w-8 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
         </svg>
      </Button>
      <Input onChange={(e) =>  handleChange(e)} onKeyDown={handleKeyDown} className={"w-full rounded-l-xl"} value={searchAlias} type="text" />
   </form>);
};