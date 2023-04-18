
import React, {useEffect, useState} from 'react';
import '../../App.css';

import {useAppDispatch, useAppSelector} from "../../store";
import {api_url} from "../../../domen.api";
import {SwiperSlide, Swiper, useSwiper} from "swiper/react";
import 'swiper/css';
import SlideNextButton from "../../components/SliderPhone/SliderButton";
import {PhoneCard} from "../../components/Product/Card/phone.card";
import {MainPagesLayout} from "../../page-component/MainPageslayout";
const Accessories = (): JSX.Element => {
    const products = useAppSelector(state => state.phone.phones);

   return <MainPagesLayout>
       <div className={"flex justify-around"}>
           <Swiper
               className={"my-20 "}
               spaceBetween={10}
               slidesPerView={3}
               navigation={true}
               onSlideChange={() => console.log('slide change')}
               onSwiper={(swiper) => console.log(swiper)}
           >

               {products.map((m) => { return m.product.map( p =>  { const pict = p.image.split(',');  return (
                   <SwiperSlide key={p.id}>
                       <PhoneCard price={p.price} name={p.name} alias={p.alias} img={`${api_url}/product/${m.brand.name}/${m.name.replace(" ", "-")}/${p.ColorAlias}/${pict[0]}`} />
                   </SwiperSlide>
               )})})}

               <SlideNextButton />

           </Swiper>
       </div>
   </MainPagesLayout>;
};



export default Accessories;

