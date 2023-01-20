import {useState} from "react";
import {Link} from "react-router-dom";
import styles from './menu.module.css';
import cn from "classnames";
import {Category} from "../../../interfaces/product.interfaces";
export const MenuMobile = () => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [level, setLevel] = useState<number>(1);
    const [currentMenu, setCurrentMenu] = useState<Category[][]>();
    const arr = ['', 'technology', 'books', 'blogs'];

    return (
        <>
            <button className={styles.button} onClick={() => setIsOpened(true)}>show menu</button>
            <nav className={styles.menu} role={"navigation"}>
                <div onClick={() => setIsOpened(false)} className={cn(styles.cover, {
                    [styles.coverShow]: isOpened,
                })} />
                <div className={cn(styles.MobileMenuBox, {
                    [styles.MobileMenuBoxShow]: isOpened,
                })}>
                    <div className={styles.MenuHeader}>
                        {level > 1 && <button className={styles.backButton}></button>}
                        back
                        Назад
                        {level === 1 && <div className={styles.backButton}>Меню</div>}
                        <button className={styles.closeButton} onClick={() => setIsOpened(false)}>Закрыть</button>
                    </div>
                    {/*{category.map( (firstCategory) => {*/}
                    {/*    return (*/}
                    {/*        <div key={firstCategory.name}>*/}
                    {/*            <Link ref={`/${arr[firstCategory.id]}`} to={}>*/}
                    {/*                {firstCategory.name}*/}
                    {/*            </Link>*/}
                    {/*            {firstCategory.secondLevelCategory.map( second => {*/}
                    {/*                return (*/}
                    {/*                    <Link href={`/${arr[firstCategory.id] + '/' +  second.id} `}>{second.name}</Link>);*/}
                    {/*            })};*/}
                    {/*        </div>*/}
                    {/*    );*/}
                    {/*}) }*/}
                </div>
            </nav>
        </>

    );
}