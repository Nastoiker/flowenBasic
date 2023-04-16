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
import { SwiperSlide, Swiper } from "swiper/react";
import 'swiper/css';
import {Autoplay, Pagination} from "swiper";
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
    img = img.map(p => ProductImagePath(currentModel, phone, p));
    return <>
        <div className={" sm:flex space-x-5 justify-between"}>
            <div className={" rounded-3xl bg-blue-300 p-2 mx-12 sm:p-10 "}>
                {
                    img.map(i => <img className={cn(" rounded-3xl object-contain w-16 h-16", {
                        [styles.CurrentPicture]: i===currentImage,
                    } )} key={i} src={i} onClick={() => setCurrentImage(i)}/>)
                }
            </div>
        <div className={"m-auto"}>
            {
                img && <img src={currentImage} width={300} className={"text-center h-fit mx-auto object-contain rounded-3xl"}   alt={"Phone"}/>
            },
        </div>


        <div className={"mx-auto text-center md:text-start space-y-8 w-96"}>
            <h1 className={"text-3xl font-bold"}>{phone.name}</h1>
            <h2 className={"text-lg"}>{phone.price}</h2>
            <h2 className={"text-lg font-bold"}>Описание</h2>
            <Paragraph type={'small'} className={"break-words"}>{phone.Description}</Paragraph>
            <div className={"flex justify-around w-full"}>
                <div className={"content-center"}>
                    <h1 className={"font-bold"}>Цвета</h1>
                    {currentModel.product.map( p =>   <div key={p.ColorAlias} onClick={() => setPhoneByColor(p.ColorAlias)}   className={cn(styles[p.ColorAlias] + " mx-auto rounded-full w-10 h-10 p-5 hover:opacity-5", { [styles.CurrentColor]: Color===p.ColorAlias})}></div> )}
                </div>
                <div>
                    <h1 className={"font-bold"}>Память</h1>
                    {currentModel.product.map( p =>   <div key={p.Memory} onClick={() => setPhoneByMemory(p.Memory)}   className={cn(styles[p.Memory] + "mx-auto rounded-full w-14 h-14 p-3 hover:opacity-5", { [styles.CurrentColor]: Memory===p.Memory})}>{p.Memory}</div> )}
                </div>
            </div>


            {basket ? <Button onClick={() => setIsBasket(false)}>Убрать из корзины</Button> : <Button onClick={() => setIsBasket(true)}>Добавить в корзину</Button> }

            <h1></h1>
        </div>
    </div>
        <div className={"sm:flex bg-white rounded-3xl p-10 my-5  justify-between"}>
            <CommentForm modelProductId={phone.modelDeviceId} userId={'123123'}  />
            <RatingForm productId={phone.modelDeviceId} isOpened={isOpened}/>
        </div>
        <div>
            <Htag type={"h1"} >Комментарии</Htag>
        {currentModel.Comment ?
            <div  className={"my-20 flex  justify-around w-full overflow-hidden"}>
                <Swiper
                    className={"flex"}
                    spaceBetween={10}
                    slidesPerView={3}
                    direction="horizontal"
                    // autoplay={{
                    //  delay: 2500,
                    //  disableOnInteraction: false,
                    // }}s
                    centeredSlides={false}

                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {currentModel.Comment.map(c =>
                        <SwiperSlide className={"w-42 mx-10 h-52"} key={c.id}>
                            <Comment key={c.id} model={currentModel} images={c.pictures?.split(',')} title={c.title} userId={c.writtenById} date={c.createdAt} comment={c.comment} />
                        </SwiperSlide>) }
                </Swiper>
            </div>

            : <Htag type={"h2"}>Оставьте свой первый комментарий</Htag> }
        </div>

    </>;
};