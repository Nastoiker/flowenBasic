import {phoneProps} from "./phone.props";
import {Paragraph} from "../../Paragraph/Paragraph";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useAppSelector} from "../../../store";
import {Button} from "../../../ui/button";
import {CommentForm} from "../../Comment/CommentForm";
import {Htag} from "../../Htag/Htag";
import {Comment} from "../../Comment/Comment";
const api_url = 'http://localhost:8000';
import './phone.css';
// import photoSmartphone from '@product/3909225.webp';
export const Phone = ({phone}: phoneProps): JSX.Element => {
    const img = phone.image?.split(',');
//../../../../../backEnd/uploads
//     const photo = img &&  `${photoSmartphone}/backEnd/uploads/product/${phone.brand.name}/${phone.modelDevice.name}/${phone.ColorAlias}/${img[0]}`;
    const photo1 =  img &&  `${api_url}/product/${phone.brand.name}/${phone.modelDevice.name.replace(' ', '-')}/${phone.ColorAlias}/${img[0]}`;
    return <>
        <div className={"flex justify-around"}>
        {
            img && <img src={photo1} className={"PhoneSize rounded-3xl object-cover"}   alt={"Phone"}/>
        }
        <div className={"space-y-8 w-96"}>
            <h1>{phone.name}</h1>
            <h2>{phone.price}</h2>
            <Button>Добавить в корзину</Button>
            <Paragraph type={'small'}>{phone.Description}</Paragraph>
            <h1>Цвета</h1>
            <h1>Память</h1>
            <h1></h1>
        </div>
    </div>
        <CommentForm modelProductId={phone.modelDeviceId} userId={'123123'}  />
        <div>
            <Htag type={"h1"}>Комментарии</Htag>
            { phone.modelDevice.comment ? phone.modelDevice.comment.map( c => <Comment userId={c.writtenById} date={c.createdAt} comment={c.comment} />) : <Htag type={"h2"}>Оставьте свой первый комментарий</Htag> }
        </div>
    </>;
};