import {phoneProps} from "./phone.props";
import {Paragraph} from "../../Paragraph/Paragraph";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useAppSelector} from "../../../store";
import {Button} from "../../../ui/button";
const api_url = 'http://localhost:8000';
// import photoSmartphone from '@product/3909225.webp';
export const Phone = ({phone}: phoneProps): JSX.Element => {
    const img = phone.image?.split(',');
    const currentModel = useAppSelector(state => state.phone.model);
//../../../../../backEnd/uploads
//     const photo = img &&  `${photoSmartphone}/backEnd/uploads/product/${phone.brand.name}/${phone.modelDevice.name}/${phone.ColorAlias}/${img[0]}`;
    const photo1 =  img &&  `${api_url}/product/${phone.brand.name}/${phone.modelDevice.name.replace(' ', '-')}/${phone.ColorAlias}/${img[0]}`;
    return <div className={"flex"}>
        {
            img && <img src={photo1} className={"rounded-3xl object-cover"} alt={"Phone"}/>
        }
        <div>
            <h1>{phone.name}</h1>
            <h2>{phone.price}</h2>
            <Button>Добавить в корзину</Button>
            <Paragraph type={'small'}>{phone.Description}</Paragraph>
        </div>
    </div>;
};