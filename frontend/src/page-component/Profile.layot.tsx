import { ReactNode, useState } from "react";
import cn from "classnames";
import { Htag } from "../components";
import { useLocation, useNavigate } from "react-router-dom";

export const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const redirectTo = (to: string) => {
    navigate(to, { replace: true });
  };
  return (
    <div className={"sm:mx-4 my-4 mx-auto space-y-5 md:flex"}>
      <div className={"rounded-3xl mx-auto block w-fit  h-fit bg-white p-2"}>
        <button
          className={cn("w-full   p-5 rounded-xl  hover:bg-blue-200", {
            "bg-blue-200": location.pathname === "/Basket",
          })}
          onClick={() => redirectTo("../Basket")}
        >
          <Htag
            className={cn("text-start", {
              "text-white": location.pathname === "/Basket",
            })}
            type={"h2"}
          >
            Корзина
          </Htag>
        </button>
        <button
          className={cn("w-full block p-5 rounded-xl  hover:bg-blue-200", {
            "bg-blue-200": location.pathname === "/buyed",
          })}
          onClick={() => redirectTo("../basket")}
        >
          <Htag
            className={cn("text-start", {
              "text-white": location.pathname === "/buyed",
            })}
            type={"h2"}
          >
            Купленные товары
          </Htag>
        </button>
        <button
          className={cn("w-full block p-5 rounded-xl  hover:bg-blue-200", {
            "bg-blue-200": location.pathname === "/comments",
          })}
          onClick={() => redirectTo("../comments")}
        >
          <Htag
            className={cn("text-start", {
              "text-white": location.pathname === "/comments",
            })}
            type={"h2"}
          >
            Комментарии
          </Htag>
        </button>
        <button
          className={cn("w-full p-5 block rounded-xl  hover:bg-blue-200", {
            "bg-blue-200": location.pathname === "/editProfile",
          })}
          onClick={() => redirectTo("../editProfile")}
        >
          <Htag
            className={cn("text-start", {
              "text-white": location.pathname === "/profile",
            })}
            type={"h2"}
          >
            Редактирования профиля
          </Htag>
        </button>
      </div>
      <div className={"w-full"}> {children}</div>
    </div>
  );
};
