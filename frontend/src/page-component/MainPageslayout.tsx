import React, { ReactNode, useEffect, useState } from "react";
import cn from "classnames";
import { Htag } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../pages/Home/button.module.css";
import { BrandsContainer } from "../components/Brands/Brands.container";
import { SliderBySwiper } from "../components/Slider/SliderSwiper";
import SliderSamsung from "/slider/sliderSamsung.webp";
import SliderApple from "/slider/sliderApple.png";
import { getPhonesFetch } from "../store/slices/phones.slices";
import { getBrandsFetch } from "../store/slices/brand.slice";
import { useAppDispatch, useAppSelector } from "../store";
interface Brand {
  name: string;
  alias: string;
  img: string;
}
export const MainPagesLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const brands = useAppSelector<Brand[]>((state) => state.brands.brands);

  const redirectTo = (to: string) => {
    navigate(to, { replace: true });
  };
  useEffect(() => {
    dispatch(getBrandsFetch());
  }, [dispatch]);
  const Sliders = [
    {
      id: 1,
      text: "",
      image: SliderApple,
    },
    {
      id: 2,
      text: "",
      image: SliderSamsung,
    },
  ];
  return (
    <>
      <div className={"sm:flex w-full justify-between  items-center"}>
        <div
          className={cn("p-3   mx-auto sm:px-7 rounded-3xl", {
            [styles.buttonCategory]: location.pathname === "/",
          })}
        >
          <button onClick={() => redirectTo("/")}> СМАРТФОНЫ</button>
        </div>
        <div
          className={cn("p-3   mx-auto sm:px-7 rounded-3xl", {
            [styles.buttonCategory]: location.pathname === "/accessories",
          })}
        >
          <button onClick={() => redirectTo("/accessories")}>АКСЕССУАРЫ</button>
        </div>
        <div
          className={cn("p-3    mx-auto  sm:px-7 rounded-3xl", {
            [styles.buttonCategory]: location.pathname === "/brands",
          })}
        >
          <button onClick={() => redirectTo("/brands")}>БРЕНДЫ</button>
        </div>
      </div>
      <BrandsContainer brands={brands} />
      {/*<Slider sliders={Sliders}/>*/}
      <SliderBySwiper sliders={Sliders} />
      <div className={"my-10"}>
        <Htag type={"h2"}>ЛУЧШИЕ ПРЕДЛОЖЕНИЯ</Htag>
      </div>
      {children}
    </>
  );
};
