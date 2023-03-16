import {phoneProps} from "./phone.props";
import {Paragraph} from "../../Paragraph/Paragraph";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../../store";
import {Button} from "../../../ui/button";
import {CommentForm} from "../../Comment/CommentForm";
import {Htag} from "../../Htag/Htag";
import {Comment} from "../../Comment/Comment";
const api_url = 'http://localhost:8000';
import cn from 'classnames';
import './phone.css';
import {setCurrentModel} from "../../../store/slices/phones.slices";
import {ModelDevice, SmartPhone} from "../../../../interfaces/product.interfaces";
import {DOMEN} from "../../../../domen.api";
import {deleteBasket, addBasketFetch} from "../../../store/slices/basket.slice";
import {RatingForm} from "../../Rating/setRating.form.";
import styles from './phoneOpen.module.css';
import {ProductImagePath} from "../../../helper/convertImagePath";
// import photoSmartphone from '@product/3909225.webp';
export const Phone = ({smartPhone, currentModel}: phoneProps): JSX.Element => {
    const [phone, setPhone] = useState<SmartPhone>(smartPhone);
    const { product } = currentModel;
    let img = phone.image?.split(',');
    useEffect(() => {
        setCurrentImage(img[0]);
    }, [phone]);
    const token = localStorage.getItem('token');
    const dispatch = useAppDispatch();
    const [basket, setIsBasket] =  useState<boolean>();
    const [basketId, setIsBasketId] = useState<string>();
    console.log(phone.id);
    const [Color, setColor] = useState<string>();
    const [Memory, setMemory] = useState<number>();
    const [currentImage, setCurrentImage] = useState<string>(img[0]);
    const setPhoneByColor = (color: string) => {
        const phoneColor = currentModel.product.find( p => {if(p.ColorAlias===color) { return p;} });
        if(!phoneColor) return;
        setColor(color);
        setMemory(phoneColor.Memory);
        setPhone(phoneColor);
    };
    const setPhoneByMemory = (Memory: number) => {
        const phoneMemory= currentModel.product.find( p => {if(p.Memory===Memory) { return p;} });
        if(!phoneMemory) return;
        setMemory(Memory);
        setColor(phoneMemory.ColorAlias);
        setPhone(phoneMemory);
    };

    const [isOpened, setIsOpened] = useState<boolean>();
    useEffect(() => {(async () => {
        if(basket) {
            const res = await fetch(DOMEN.basket.addBasket, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                method: 'POST',
                body: JSON.stringify({productId: phone.id, quantity: 1}),
            });
            const data = await res.json();
            setIsBasketId(data.id);
        } else if(!basketId){
                if(!basketId) return;
                dispatch(deleteBasket({id: basketId}));

            }})();
    }, [basket]);
    img.pop();
    console.log(img);
    img = img.map(p => ProductImagePath(currentModel, phone, p));
    return <>
        <div className={"flex justify-around"}>
            <div className={" rounded-3xl bg-blue-300 p-10"}>
                {
                    img.map(i => <img className={cn("my-10 rounded-3xl object-cover w-16 h-16", {
                        [styles.CurrentPicture]: i===currentImage,
                    } )} key={i} src={i} onClick={() => setCurrentImage(i)}/>)
                }
            </div>

        {
            img && <img src={currentImage} className={"PhoneSize rounded-3xl object-cover"}   alt={"Phone"}/>
        },

        <div className={"space-y-8 w-96"}>
            <h1>{phone.name}</h1>
            <h2>{phone.price}</h2>
            {basket ? <Button onClick={() => setIsBasket(false)}>Убрать из корзины</Button> : <Button onClick={() => setIsBasket(true)}>Добавить в корзину</Button> }
            <Paragraph type={'small'}>{phone.Description}</Paragraph>
            <h1>Цвета</h1>
            {currentModel.product.map( p =>   <div key={p.ColorAlias} onClick={() => setPhoneByColor(p.ColorAlias)}   className={cn(styles[p.ColorAlias] + " rounded-3xl w-20 p-5 hover:opacity-5", { [styles.CurrentColor]: Color===p.ColorAlias})}>{p.ColorAlias}</div> )}
            <h1>Память</h1>
            {currentModel.product.map( p =>   <div key={p.Memory} onClick={() => setPhoneByMemory(p.Memory)}   className={cn(styles[p.Memory] + " rounded-3xl w-20 p-5 hover:opacity-5", { [styles.CurrentColor]: Memory===p.Memory})}>{p.Memory}</div> )}

            <h1></h1>
        </div>
    </div>
        <CommentForm modelProductId={phone.modelDeviceId} userId={'123123'}  />
        <div>
            <Htag type={"h1"}>Комментарии</Htag>
            { currentModel.Comment ? currentModel.Comment.map( c => <Comment key={c.id} model={currentModel} images={c.pictures?.split(',')} title={c.title} userId={c.writtenById} date={c.createdAt} comment={c.comment} />) : <Htag type={"h2"}>Оставьте свой первый комментарий</Htag> }
        </div>
        <RatingForm productId={phone.modelDeviceId} isOpened={isOpened}/>
    </>;
};