import {useAppSelector} from "../../store";
import {userState} from "../../store/slices/user.slice";
import {ProductoOnBasket} from "../../components/Basket/productoOnBasket";
import {Basket} from "../../store/slices/basket.slice";
import {PhoneCardMini} from "../../components/Basket/PhoneCard.mini";
import {Htag} from "../../components";
import {Button} from "../../ui/button";
import {Checkbox} from "../../ui/checkbox";
import {ProfileLayout} from "../../page-component/Profile.layot";

const BasketPage = () => {
    const basket = useAppSelector<Basket[]>(state => state.basket.basket);
    return (
        <ProfileLayout>
        <div className={"sm:flex  mx-5 sm:space-x-10 space-y-5 justify-between "} >
            <div className={"bg-white  p-5 space-y-5 sm:p-10 rounded-3xl w-full"}>
                <Htag type={'h1'}>Ваша корзина</Htag>
                {
                    basket.map( b =>  <PhoneCardMini  key={b.id} basket={b}/>)}
            </div>

           <div className={"bg-white rounded-3xl my-5 space-y-5 p-3 sm:p-5"}>
                   <Htag type="h1">Итоговая цена:</Htag>


               <Htag type="h2">{basket.reduce((sum, item) => sum + item.product.price * item.quantity, 0 )}р </Htag>


               <Button className={"block"}>Оплатить заказ</Button>
               <div className={"flex  border-t py-5 bottom-0"}>
                   <Checkbox id={"Confirm"}/>
                   <label className="break-words w-48 block" htmlFor="Confirm">Согласен с условиями  Правил пользования торговой площадкой
                       и правилами возврата</label>
               </div>

           </div>


            </div>
        </ProfileLayout>);

};
export default BasketPage;