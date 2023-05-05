import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "../../ui/menubar";
import {Button} from "../../ui/button";
import {Search} from "../Search/Search";
import {useAppDispatch, useAppSelector} from "../../store";
import {Avatar, AvatarFallback, AvatarImage} from "../../ui/avatar";
import {userState} from "../../store/slices/user.slice";
import {api_url} from "../../../domen.api";
import {redirect, useNavigate} from "react-router-dom";
import {logoutSuccess} from "../../store/slices/auth.slice";
import {ReactComponent as Basket } from './Basket.svg';
import {useMemo, useState} from "react";
import {ProductoOnBasket} from "../Basket/productoOnBasket";
import {getBasketFetch} from "../../store/slices/basket.slice";
import { ReactComponent as SearchIcon} from './search.svg';
import { ReactComponent as UserIcon} from './UserIcon.svg';
import SearchBar from "../Search/SearchAnimate";
// import ReactComponent as Basket from '../../icons/profile.svg';
export const Header = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const user = useAppSelector<userState>(state => state.user.user);
    const [searchIsActive, setIsActiveSearch] = useState<boolean>(false);
    const logOut = () => {
        console.log(1);
        dispatch(logoutSuccess());
        window.location.reload();
    };
    const navigate = useNavigate();

    const redirectTo =  (to: string) => {
        navigate('../../../' + to);
    };
    const [openBasket, setOpenBasket] = useState<boolean>();
    const basket = useAppSelector(state => state.basket.basket);
    return (<div className={"mb-10"}>



            <div className={"flex items-center border-b-4 p-5 justify-between"}>

                <img src="" alt=""/>

                <div className={'sm:flex sm:items-center  sm:space-x-6'}>
                    <Search />

                    <div className={"flex items-center justify-end"}>
                        <div onClick={() => {setOpenBasket((s) => !s) }}>
                            <div className={"rounded-3xl absolute bg-white w-7 text-center"}>{user.basket?.length}</div>
                            <ProductoOnBasket basket={basket} />
                        </div>
                        { user.id ?  ( <div className={"flex space-x-3"}><Avatar onClick={() => redirectTo('/profile')}>
                            <AvatarImage className={"hover:opacity-5"} src={api_url + '/user/avatar/' + user.id + '/' + user.avatar} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                            <Button onClick={logOut}>Выйти</Button>
                        </div>) : <>
                            <Menubar>
                                <MenubarMenu>
                                    <MenubarTrigger className={"bg-transparent"}><UserIcon /></MenubarTrigger>
                                    <MenubarContent>
                                        <MenubarItem>
                                            <Button onClick={() => redirectTo('login')}>Авторизироваться</Button>
                                        </MenubarItem>
                                        <MenubarItem>
                                            <Button onClick={() => redirectTo('register')}>Зарегистрироваться</Button>
                                        </MenubarItem>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        </>}
                    </div>


                </div>
            </div>
    </div>
    );
}






























{/*    <Menubar  className={"hidden sm:flex border-none border-b-gray-200 bg-transparent justify-between"}>*/}
{/*    <MenubarMenu>*/}
{/*        <MenubarTrigger>Ваш город</MenubarTrigger>*/}
{/*        <MenubarContent>*/}
{/*            <MenubarItem>*/}
{/*                New Tab <MenubarShortcut>⌘T</MenubarShortcut>*/}
{/*            </MenubarItem>*/}
{/*            <MenubarItem>New Window</MenubarItem>*/}
{/*            <MenubarSeparator />*/}
{/*            <MenubarItem>Share</MenubarItem>*/}
{/*            <MenubarSeparator />*/}
{/*            <MenubarItem>Print</MenubarItem>*/}
{/*        </MenubarContent>*/}
{/*    </MenubarMenu>*/}
{/*    <MenubarMenu>*/}
{/*        <MenubarTrigger>Способ оплаты</MenubarTrigger>*/}
{/*        <MenubarContent>*/}
{/*            <MenubarItem>*/}
{/*                New Tab <MenubarShortcut>⌘T</MenubarShortcut>*/}
{/*            </MenubarItem>*/}
{/*            <MenubarItem>New Window</MenubarItem>*/}
{/*            <MenubarSeparator />*/}
{/*            <MenubarItem>Share</MenubarItem>*/}
{/*            <MenubarSeparator />*/}
{/*            <MenubarItem>Print</MenubarItem>*/}
{/*        </MenubarContent>*/}
{/*    </MenubarMenu>*/}
{/*    <MenubarMenu>*/}
{/*        <MenubarTrigger>оплата и доставка</MenubarTrigger>*/}
{/*        <MenubarContent>*/}
{/*            <MenubarItem>*/}
{/*                New Tab <MenubarShortcut>⌘T</MenubarShortcut>*/}
{/*            </MenubarItem>*/}
{/*            <MenubarItem>New Window</MenubarItem>*/}
{/*            <MenubarSeparator />*/}
{/*            <MenubarItem>Share</MenubarItem>*/}
{/*            <MenubarSeparator />*/}
{/*            <MenubarItem>Print</MenubarItem>*/}
{/*        </MenubarContent>*/}
{/*    </MenubarMenu>*/}
{/*    <MenubarMenu>*/}
{/*        <MenubarTrigger>поддержка</MenubarTrigger>*/}
{/*        <MenubarContent>*/}
{/*            <MenubarItem>*/}
{/*                New Tab <MenubarShortcut>⌘T</MenubarShortcut>*/}
{/*            </MenubarItem>*/}
{/*            <MenubarItem>New Window</MenubarItem>*/}
{/*            <MenubarSeparator />*/}
{/*            <MenubarItem>Share</MenubarItem>*/}
{/*            <MenubarSeparator />*/}
{/*            <MenubarItem>Print</MenubarItem>*/}
{/*        </MenubarContent>*/}
{/*    </MenubarMenu>*/}
{/*    <MenubarMenu>*/}
{/*        <MenubarTrigger>контакты</MenubarTrigger>*/}
{/*        <MenubarContent>*/}
{/*            <MenubarItem>*/}
{/*                New Tab <MenubarShortcut>⌘T</MenubarShortcut>*/}
{/*            </MenubarItem>*/}
{/*            <MenubarItem>New Window</MenubarItem>*/}
{/*            <MenubarSeparator />*/}
{/*            <MenubarItem>Share</MenubarItem>*/}
{/*            <MenubarSeparator />*/}
{/*            <MenubarItem>Print</MenubarItem>*/}
{/*        </MenubarContent>*/}
{/*    </MenubarMenu>*/}
{/*    <MenubarMenu>*/}
{/*        <MenubarTrigger>о компании</MenubarTrigger>*/}
{/*        <MenubarContent>*/}
{/*            <MenubarItem>*/}
{/*                New Tab <MenubarShortcut>⌘T</MenubarShortcut>*/}
{/*            </MenubarItem>*/}
{/*            <MenubarItem>New Window</MenubarItem>*/}
{/*            <MenubarSeparator />*/}
{/*            <MenubarItem>Share</MenubarItem>*/}
{/*            <MenubarSeparator />*/}
{/*            <MenubarItem>Print</MenubarItem>*/}
{/*        </MenubarContent>*/}
{/*    </MenubarMenu>*/}
{/*    <MenubarMenu>*/}
{/*        <MenubarTrigger>8 (800) 555 35 35</MenubarTrigger>*/}
{/*        <MenubarContent>*/}
{/*            <MenubarItem>*/}
{/*                New Tab <MenubarShortcut>⌘T</MenubarShortcut>*/}
{/*            </MenubarItem>*/}
{/*            <MenubarItem>New Window</MenubarItem>*/}
{/*            <MenubarSeparator />*/}
{/*            <MenubarItem>Share</MenubarItem>*/}
{/*            <MenubarSeparator />*/}
{/*            <MenubarItem>Print</MenubarItem>*/}
{/*        </MenubarContent>*/}
{/*    </MenubarMenu>*/}
{/*</Menubar>*/}