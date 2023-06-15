import React, { useEffect, useState } from "react";
import "../../App.css";

import { useAppDispatch, useAppSelector } from "../../store";
import { api_url } from "../../../domen.api";
import { SwiperSlide, Swiper, useSwiper } from "swiper/react";
import "swiper/css";
import SlideNextButton from "../../components/SliderPhone/SliderButton";
import { PhoneCard } from "../../components/Product/Card/phone.card";
import { MainPagesLayout } from "../../page-component/MainPageslayout";
import {StaticSlider} from "../../components/Slider/StaticSlider";
interface IItems {
    subtitle: string;
    title: string;
    picture: string;
    id: string;
}
const Accessories = (): JSX.Element => {
  const products = useAppSelector((state) => state.phone.phones);
    const StaticSliderArr: IItems[] = [
        {
            id: "1",
            subtitle: "APPLE",
            title: "IPHONE",
            picture: api_url + "/slider1.png",
        },
        {
            id: "2",
            subtitle: "SSS",
            title: "BBBB",
            picture:   api_url +  "/slider1.png",
        },
        {
            id: "3",
            subtitle: "APPLE",
            title: "IPHONE",
            picture:  api_url + "/slider1.png",
        },
        {
            id: "4",
            subtitle: "APPLE",
            title: "IPHONE",
            picture:  api_url + "/slider1.png",
        },
        {
            id: "5",
            subtitle: "APPLE",
            title: "IPHONE",
            picture:  api_url + "/slider1.png",
        },
    ];
  return (
    <MainPagesLayout>
      <div className={"mx-auto"}>
          <Swiper
              className={"mt-20 mx-20 w-full"}
              slidesPerView={3}
              // centeredSlidesBounds={true}
              breakpoints={{
                  // ширина экрана >= 640 пикселей
                  340: {
                      slidesPerView: 1,
                  },
                  // ширина экрана >= 1040 пикселей
                  400: {
                      slidesPerView: 2,
                  },
                  600: {
                      slidesPerView: 3,
                  },
              }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              centeredSlidesBounds={true}
          >
              {products &&
                  products.map((m) => {
                      return m.product.map((p) => {
                          const pict = p.image.split(",");
                          return (
                              <SwiperSlide className={"w-42 h-52 mx-auto"} key={p.id}>
                                  <PhoneCard
                                      className={"mx-auto w-full"}
                                      price={p.price}
                                      name={p.name}
                                      alias={p.alias}
                                      oldPrice={p.oldPrice}
                                      id={p.id}
                                      img={`${api_url}/product/${m.brand.name}/${m.name.replace(
                                          " ",
                                          "-"
                                      )}/${p.ColorAlias}/${pict[0]}`}
                                  />
                              </SwiperSlide>
                          );
                      });
                  })}

              <SlideNextButton />
          </Swiper>
          <StaticSlider title={"НОВИНКИ"} items={StaticSliderArr} />
      </div>
    </MainPagesLayout>
  );
};

export default Accessories;
