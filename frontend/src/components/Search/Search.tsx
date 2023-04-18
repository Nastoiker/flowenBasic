import {SearchProps} from "./Search.props";
import cn from "classnames";
import styles from './Search.module.css';
import {useState, KeyboardEvent, useRef} from "react";
import {Button} from "../Button/Button";
import {redirect, useNavigate} from 'react-router-dom';
// import  * as SearchIcon  from './search.svg';
import { motion, spring } from 'framer-motion';
import { ReactComponent as SearchSvg } from './search.svg';
import {Input} from "../Input/Input";
import {useAppDispatch, useAppSelector} from "../../store";
import { SmartPhone } from "../../../interfaces/product.interfaces";
import {getFounded, setSearch} from "../../store/slices/search.slice";
import SearchPage from "../../pages/Search/Search";
export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
   const dispatch = useAppDispatch();
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const handleSearchClick = () => {
        setIsSearchVisible(!isSearchVisible);
    };
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const inputRef = useRef(null)
    const phones = useAppSelector(state => state.phone.phones);
   const [searchAlias, setSearchAlias] = useState<string>('');
   const navigate = useNavigate();
   const founded = useAppSelector(state => state.search.founded);
    const redirectTo =  (to: string) => {
        navigate(to);
    };
   const goToSearch = () => {
       // return redirectTo('/Search/' + searchAlias);
   };

    const handleKeyDown = (e: KeyboardEvent) => {
       if(e.key==='Enter') {
         goToSearch();
           redirectTo('Search/:' + searchAlias);

       }
   };
   const handleChange = (e: any) => {
       // if(e.target.value.replace(' ', '')==='') {
       //     setIsSearchVisible(false)
       // }
       const search = e.target.value;
       setSearchAlias(search);
       dispatch(setSearch(searchAlias));
       dispatch(getFounded(phones));
   };
       return <div className={"flex-none md:flex-1"}>
        <div className={"flex md:flex-1 justify-between self-end"}>
            <div>
                <form  className={cn(className, "w-fit ", { "hidden": !isSearchVisible})} {...props} role={'search'}>
                    <motion.div
                        initial={{ opacity: 0, x: '0%' }}
                        animate={{  opacity: isSearchVisible ? 1 : 0,   x: isSearchVisible ? '-30%' : '0%', transition: {
                                stiffness: 100
                            } }}>
                        <Input   onBlur={() => setIsFocus(false)} onFocus={() => setIsFocus(true)}  onChange={(e) =>  handleChange(e)} onKeyDown={handleKeyDown} className={" w-fit indent-16 rounded-l-xl"} value={searchAlias} type="text" />

                    </motion.div>
                    {
                        ( isFocus && founded && founded.length>0)  && <div className={" bg-white p-5 mx-auto rounded-2xl w-72 absolute z-12 my-12"}>{founded.map( p =><a className="hover:opacity-5 block" key={p.id} href={'/product/phone/' + p.product[0]?.alias}>{p.name}</a>)}</div>
                    }
                </form>
            </div>
            <button className="z-50" onClick={() => {setIsSearchVisible(s => !s)}}><SearchSvg /></button>
        </div>
    </div>

};