import { Input } from "../../ui/input";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store";
import { useForm } from "react-hook-form";
import { ILogin, IRegister } from "../../../interfaces/register.interface";
import { loginFetch } from "../../store/slices/auth.slice";
import { redirect, useNavigate } from "react-router-dom";

const Authorization = (): JSX.Element => {
  const [isCorrect, setCorrect] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector((state) => state.auth.error);

  const redirectTo = (to: string) => {
    navigate(to, { replace: true });
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegister>();
  const onSubmit = async (formData: ILogin) => {
    try {
      dispatch(loginFetch(formData));
      await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
      const token = localStorage.getItem("token");
      if (token && token.length > 0) {
        redirectTo("/");
        window.location.reload();
      }
      reset();
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };
  return (
    <div
      className={
        "bg-white  m-10 max-w-2xl space-y-6 md:mx-auto rounded-3xl text-center p-10"
      }
    >
      <h1>Авторизация</h1>

      <form action="" className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type={"email"}
          error={errors.email}
          {...register("email", {
            required: { value: true, message: "Заполните email" },
          })}
          placeholder={"email"}
        />
        <Input
          error={errors.password}
          type={"password"}
          {...register("password", {
            required: { value: true, message: "Заполните password" },
          })}
          placeholder={"password"}
        />
        <Button>Авторизироваться</Button>
        {error.length > 0 && (
          <span className={"block text-red-600"}>{error}</span>
        )}
      </form>
    </div>
  );
};
export default Authorization;
