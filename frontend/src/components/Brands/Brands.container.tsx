import React, { useState } from "react";
import { BrandsContainerProps } from "./Brands.container.props";


import "swiper/css";
import { useNavigate } from "react-router-dom";
import { Brand } from "./Brand";
import { Swiper, SwiperSlide } from "swiper/react";

import SlideNextButton from "../SliderPhone/SliderButton";
export const BrandsContainer = ({ brands }: BrandsContainerProps) => {
  const [currentNumber, setCurrentNumber] = useState<number>();
  const [currentBrand, setCurrentBrand] = useState<boolean>();
  const navigate = useNavigate();
  const redirectTo = (to: string) => {
    navigate("../../../" + to);
  };
  console.log(brands);
  return (
    <div className="mx-auto">
      <Swiper
        // centeredSlidesBounds={true}
        breakpoints={{
          // ширина экрана >= 640 пикселей
          // ширина экрана >= 1040 пикселей
          200: {
            slidesPerView: 2,
          },
          600: {
            slidesPerView: 3,
          },
        }}
        className={"my-20"}
        slidesPerView={3}
        centeredSlidesBounds={true}
        // navigation={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {brands.map((b) => (
          <SwiperSlide
            onClick={() => {
              redirectTo("/Brand/:" + b.name);
            }}
            className={"w-42 flex h-52"}
            key={b.id}
          >
            <Brand brand={b!} isActive={currentBrand!} />{" "}
          </SwiperSlide>
        ))}
        <SlideNextButton />
      </Swiper>
    </div>
  );
};
