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
const sliders = [
  { img: "", id: "1" },
  { img: "", id: "2" },
  { img: "", id: "3" },
];
const Brands = (): JSX.Element => {
  return (
    <MainPagesLayout>
      {" "}
      <div></div>
    </MainPagesLayout>
  );
};

export default Brands;
