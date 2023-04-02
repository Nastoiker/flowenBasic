
import React, {useEffect, useState} from 'react';
import * as Popover from '@radix-ui/react-popover';
import '../../App.css';
import cn from "classnames";
import styles from './button.module.css';
import {getPhonesFetch} from "../../store/slices/phones.slices";
import {useAppDispatch, useAppSelector} from "../../store";
import {api_url} from "../../../domen.api";
import {SwiperSlide, Swiper, useSwiper} from "swiper/react";
import 'swiper/css';
import SlideNextButton from "../../components/SliderPhone/SliderButton";
import {PhoneCard} from "../../components/Product/Card/phone.card";
const sliders = [{ img: '', id: '1'}, { img: '', id: '2'}, { img: '', id: '3'}];
const Home = (): JSX.Element => {

 const [currentCategory, setCurrentCategory] = useState<string>('');
 const dispatch = useAppDispatch();
 useEffect(() => {
  dispatch(getPhonesFetch());
 }, [dispatch]);
 const swiper = useSwiper();
 const products = useAppSelector(state => state.phone.filtered);
 return (<>
  <div className={"flex justify-around items-center"}>
   <div className={cn("p-3 px-7 rounded-3xl", { [styles.buttonCategory]: currentCategory === 'СМАРТФОНЫ'})}><button onClick={() => setCurrentCategory('СМАРТФОНЫ')}> СМАРТФОНЫ</button></div>
   <div className={cn("p-3 px-7 rounded-3xl", { [styles.buttonCategory]: currentCategory === 'АКСЕССУАРЫ'})}><button onClick={() => setCurrentCategory('АКСЕССУАРЫ')}>АКСЕССУАРЫ</button></div>
   <div className={cn("p-3 px-7 rounded-3xl", { [styles.buttonCategory]: currentCategory === 'БРЕНДЫ'})}><button onClick={() => setCurrentCategory('БРЕНДЫ')}>БРЕНДЫ</button></div>
  </div>
  <div>
   <div>
    <Swiper
        className={"my-20 "}
        spaceBetween={10}
        slidesPerView={3}
        autoplay={{
         delay: 2500,
         disableOnInteraction: false,
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
    >
     {
      sliders.map( s =>  <SwiperSlide key={p.id}>
       <img src={s.img} alt=""/>
      </SwiperSlide>)
     }

     <SlideNextButton />

    </Swiper>

   </div>
   <h1>ЛУЧШИЕ ПРЕДЛОЖЕНИЯ</h1>
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

  </div>

 </> );
};



export default Home;

