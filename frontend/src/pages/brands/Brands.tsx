import React, { useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import "../../App.css";
import cn from "classnames";
import styles from "./button.module.css";
import { getPhonesFetch } from "../../store/slices/phones.slices";
import { useAppDispatch, useAppSelector } from "../../store";
import { api_url } from "../../../domen.api";
import { SwiperSlide, Swiper, useSwiper } from "swiper/react";
import "swiper/css";
import SlideNextButton from "../../components/SliderPhone/SliderButton";
import { PhoneCard } from "../../components/Product/Card/phone.card";
import { useLocation, useNavigate } from "react-router-dom";
import { MainPagesLayout } from "../../page-component/MainPageslayout";
import {Htag} from "../../components";
const sliders = [
  { img: "", id: "1" },
  { img: "", id: "2" },
  { img: "", id: "3" },
];
const Brands = (): JSX.Element => {
    const products = useAppSelector((state) => state.phone.phones);

    return (
    <MainPagesLayout>
      <div className={"mx-auto   "}>
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
        <div className={"block my-10 flex items-center hover:opacity-70"}>
          <Htag type="h2">
            <a href={"/product/phone"}>Посмотреть все смартфоны</a>
          </Htag>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              viewBox="0 0 24 24"
          >
            <path d="M16 12L10 18V6L16 12Z"></path>
          </svg>
        </div>
      </div>
    </MainPagesLayout>
  );
};

export default Brands;
