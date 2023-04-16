import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import {sliderProps} from "./slider.props";
import {Autoplay, Pagination} from "swiper";

 export const SliderBySwiper =  ({sliders}: sliderProps) => {
    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            autoplay={{
                pauseOnMouseEnter: true,
                disableOnInteraction: false
            }}
        >
            {
                sliders.map( s =>  <SwiperSlide><img className={"h-full min-h-[250px]  w-full"} src={s.image} alt=""/></SwiperSlide>)
            }
        </Swiper>
    );
};