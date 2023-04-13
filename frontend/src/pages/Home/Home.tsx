
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
import {useLocation, useNavigate} from "react-router-dom";
import {Slider} from "../../components/Slider/slider";
const sliders = [{ img: '', id: '1'}, { img: '', id: '2'}, { img: '', id: '3'}];
import SliderSamsung from '/slider/sliderSamsung.webp'
import SliderApple from '/slider/sliderApple.png'
import {SliderBySwiper} from "../../components/Slider/SliderSwiper";

const Home = (): JSX.Element => {

 const [currentCategory, setCurrentCategory] = useState<string>('');
 const location = useLocation();
 const dispatch = useAppDispatch();
 useEffect(() => {
  dispatch(getPhonesFetch());
 }, [dispatch]);
 const swiper = useSwiper();
 const navigate = useNavigate();

 const redirectTo =  (to: string) => {
  setCurrentCategory(to);
  navigate( to, { replace: true});
 };
 const Sliders = [{
   id: 1,
  text: '',
  image: SliderApple,
 },
  {
   id: 2,
   text: '',
   image: SliderSamsung,
  }];
  const products = useAppSelector(state => state.phone.filtered);
  const BestProducts = products.sort( (a, b) => a.rating - b.rating )
 return (<>
  <div className={"flex justify-around items-center"}>
   <div className={cn("p-3 w-fit sm:px-7 rounded-3xl", { [styles.buttonCategory]: location.pathname === '/'})}><button onClick={() => redirectTo('/')}> СМАРТФОНЫ</button></div>
   <div className={cn("p-3 w-fit  sm:px-7 rounded-3xl", { [styles.buttonCategory]: currentCategory === '/accessories'})}><button onClick={() => redirectTo('/accessories')}>АКСЕССУАРЫ</button></div>
   <div className={cn("p-3  w-fit  sm:px-7 rounded-3xl", { [styles.buttonCategory]: currentCategory === '/brands'})}><button onClick={() => redirectTo('/brands')}>БРЕНДЫ</button></div>
  </div>
  {/*<Slider sliders={Sliders}/>*/}
  <SliderBySwiper sliders={Sliders}/>
  <div>


   <h1>ЛУЧШИЕ ПРЕДЛОЖЕНИЯ</h1>
   <a href={'/product/phone'}>Посмотреть все смартфоны</a>

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
         <SwiperSlide className={"w-42"} key={p.id}>
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

