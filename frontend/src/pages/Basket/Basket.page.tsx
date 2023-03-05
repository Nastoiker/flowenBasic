import {useAppSelector} from "../../store";
import {userState} from "../../store/slices/user.slice";
import {ProductoOnBasket} from "../../components/Basket/productoOnBasket";
import {Basket} from "../../store/slices/basket.slice";
import {PhoneCardMini} from "../../components/Basket/PhoneCard.mini";
import {Htag} from "../../components";

const BasketPage = () => {
    const basket = useAppSelector<Basket[]>(state => state.basket.basket);
    return (
        <>{
            basket.map( b =>  <PhoneCardMini  key={b.id} basket={b}/>)}
            <Htag type="h1">{basket.reduce((sum, item) => sum + item.product.price * item.quantity, 0 )} </Htag>
            </>
    );

};
export default BasketPage;