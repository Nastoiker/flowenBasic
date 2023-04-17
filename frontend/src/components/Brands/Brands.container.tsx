import React, { useState } from "react";
import {BrandsContainerProps} from "./Brands.container.props";
import { ReactComponent as ArrowIcon } from './arrow.svg';
import {Autoplay, Pagination} from "swiper";

import 'swiper/css';
import { useNavigate } from "react-router-dom";
import { Brand } from "./Brand";
import {Swiper, SwiperSlide} from "swiper/react";
import {PhoneCard} from "../Product/Card/phone.card";
import {api_url} from "../../../domen.api";
import SlideNextButton from "../SliderPhone/SliderButton";
import {SliderBrans} from "../Custom/CustomSlider";
export const BrandsContainer = ({ brands } : BrandsContainerProps) => {
  const [currentNumber, setCurrentNumber] = useState<number>();
  const [currentBrand, setCurrentBrand] = useState<boolean>();
  const navigate = useNavigate();
    const redirectTo =  (to: string) => {
        navigate('../../../' + to);
    };
    console.log(brands);
    return <div className="">
      <Swiper
        
            className={"my-20 mx-20 w-full"}
            slidesPerView={3}

            // centeredSlidesBounds={true}

            navigation={true}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >{
          brands.map(b => <SwiperSlide onClick={() => { redirectTo('/Brand/:' + b.name)}} className={"w-42 h-52"} key={b.id}><Brand brand={b} isActive={currentBrand}/> </SwiperSlide> )
            }
            <SlideNextButton />
        </Swiper>
      </div>
}