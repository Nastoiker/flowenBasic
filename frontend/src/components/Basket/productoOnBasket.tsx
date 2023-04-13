import {useState} from "react";
import {phoneProps} from "../Product/Phone/phone.props";
import {PhoneCardMini} from "./PhoneCard.mini";
import {productOnBasketProps} from "./productOnBasket.props";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../ui/sheet";
import {Button} from "../../ui/button";
import {ReactComponent as Basket } from './Basket.svg';
export const ProductoOnBasket = ({basket}: productOnBasketProps) => {
    return (
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost"> <Basket /></Button>
                </SheetTrigger>
                <SheetContent position="right" size="sm">
                    <SheetHeader>
                        <SheetTitle>Ваша корзина</SheetTitle>
                        <SheetDescription>
                            { basket.length===0 && <h1>Ваша корзина пуста</h1> }
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        { basket.length>0 ? basket.map( b =>  <PhoneCardMini  key={b.id} basket={b}/>) : <div>Ваша корзина пуста</div>}
                    </div>
                    <SheetFooter>
                        <Button type="submit">Открыть корзину</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
    );
};
{/*const*/}