import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { sliderProps } from "./slider.props";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const SliderBySwiper = ({ sliders }: sliderProps) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay={{
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
    >
      {sliders.map((s) => (
        <SwiperSlide>
          <img
            className={"max-h-[500px] min-h-[200px]  w-full"}
            src={s.image}

          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
