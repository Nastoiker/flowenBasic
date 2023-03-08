import {phoneProps} from "./phone.props";
import {Paragraph} from "../../Paragraph/Paragraph";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../../store";
import {Button} from "../../../ui/button";
import {CommentForm} from "../../Comment/CommentForm";
import {Htag} from "../../Htag/Htag";
import {Comment} from "../../Comment/Comment";
const api_url = 'http://localhost:8000';
import './phone.css';
import {setCurrentModel} from "../../../store/slices/phones.slices";
import {ModelDevice} from "../../../../interfaces/product.interfaces";
import {DOMEN} from "../../../../domen.api";
import {deleteBasket, addBasketFetch} from "../../../store/slices/basket.slice";
import {RatingForm} from "../../Rating/setRating.form.";
// import photoSmartphone from '@product/3909225.webp';
export const Phone = ({phone, currentModel}: phoneProps): JSX.Element => {
    console.log(phone);
    console.log('info' + phone.modelDeviceId);
    console.log( currentModel + 'current');
    const token = localStorage.getItem('token');
    const dispatch = useAppDispatch();
    const [basket, setIsBasket] =  useState<boolean>();
    const [basketId, setIsBasketId] = useState<string>();
    console.log(phone.id);
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
    const img = phone.image?.split(',');
//../../../../../backEnd/uploads
//   const photo = img &&  `${photoSmartphone}/backEnd/uploads/product/${phone.brand.name}/${phone.modelDevice.name}/${phone.ColorAlias}/${img[0]}`;
    const photo1 =  img &&  `${api_url}/product/${phone.brand.name}/${phone.modelDevice.name.replace(' ', '-')}/${phone.ColorAlias}/${img[0]}`;
    return <>
        <div className={"flex justify-around"}>
        {
            img && <img src={photo1} className={"PhoneSize rounded-3xl object-cover"}   alt={"Phone"}/>
        }
        <div className={"space-y-8 w-96"}>
            <h1>{phone.name}</h1>
            <h2>{phone.price}</h2>
            {basket ? <Button onClick={() => setIsBasket(false)}>Убрать из корзины</Button> : <Button onClick={() => setIsBasket(true)}>Добавить в корзину</Button> }
            <Paragraph type={'small'}>{phone.Description}</Paragraph>
            <h1>Цвета</h1>
            <h1>Память</h1>
            <h1></h1>
        </div>
    </div>
        <CommentForm modelProductId={phone.modelDeviceId} userId={'123123'}  />
        <div>
            <Htag type={"h1"}>Комментарии</Htag>
            { currentModel.Comment ? currentModel.Comment.map( c => <Comment key={c.id} title={c.title} userId={c.writtenById} date={c.createdAt} comment={c.comment} />) : <Htag type={"h2"}>Оставьте свой первый комментарий</Htag> }
        </div>
        <RatingForm productId={phone.id} isOpened={isOpened}/>
    </>;
};