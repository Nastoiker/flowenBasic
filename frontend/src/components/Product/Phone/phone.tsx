import {phoneProps} from "./phone.props";
import {Paragraph} from "../../Paragraph/Paragraph";
import {useEffect, useState} from "react";
const api_url = 'http://localhost:8000';
// import photoSmartphone from '@product/3909225.webp';
export const Phone = ({phone}: phoneProps): JSX.Element => {
    const img = phone.image?.split(',');

//../../../../../backEnd/uploads
//     const photo = img &&  `${photoSmartphone}/backEnd/uploads/product/${phone.brand.name}/${phone.modelDevice.name}/${phone.ColorAlias}/${img[0]}`;
    const photo1 =  img &&  `${api_url}/product/${phone.brand.name}/${phone.modelDevice.name.replace(' ', '-')}/${phone.ColorAlias}/${img[0]}`;
    return <div>
        {
            img && <img src={photo1} alt={""}/>
        }
        <div>
            <h1>{phone.name}</h1>
            <Paragraph type={'small'}>{phone.Description}</Paragraph>
        </div>
    </div>;
};