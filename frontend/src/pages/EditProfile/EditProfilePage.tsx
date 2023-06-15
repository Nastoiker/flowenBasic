import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { DOMEN } from "../../../domen.api";
import { useState } from "react";
import axios from "axios";
import { Button } from "../../ui/button";
import { useAppSelector } from "../../store";
import { IEditProfile } from "../../components/Profile/Profile.interface";
import { Htag } from "../../components";
import { ProfileLayout } from "../../page-component/Profile.layot";

const EditProfile = (): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditProfile>();
  const [error, setErrorForm] = useState<string>("");
  const token = localStorage.getItem("token");
  const { login, email, phone } = useAppSelector((state) => state.user.user!);
  const Submit = async (formData: IEditProfile) => {
    try {
      const { data } = await axios.post(
        DOMEN.user.editProfile,
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setErrorForm("ok");
    } catch (e) {
      if (e instanceof Error) {
        setErrorForm(e.message);
      }
    }
  };
  return (
    <ProfileLayout>
      <div className={"bg-white m-5 p-10 rounded-3xl space-y-5"}>
        <div className={"text-center"}>
          <Htag type={"h1"}>Редактирование профиля</Htag>
        </div>
        <form action="" onSubmit={handleSubmit(Submit)}>
          <label htmlFor="phone">Заполните номер</label>
          <Input
            placeholder={phone}
            {...register("phone", {
              required: { value: true, message: "Заполните Phone" },
            })}
            id={"phone"}
          />
          <label htmlFor="login">Заполните никнейм</label>
          <Input
            error={errors.login}
            placeholder={login}
            {...register("login", {
              required: { value: true, message: "Заполните login" },
            })}
            id={"login"}
          />
          <label htmlFor="login">Заполните старый пароль</label>
          <Input
            type={"password"}
            error={errors.password}
            {...register("password", {
              required: { value: true, message: "Заполните старый пароль" },
            })}
            id={"phone"}
          />
          <label htmlFor="login">Заполните новый пароль</label>
          <Input
            type={"password"}
            error={errors.hashpassword}
            {...register("hashpassword", {
              required: { value: true, message: "Заполните новый пароль" },
            })}
            id={"phone"}
          />

          {/*<h1>Персональные данные</h1>*/}
          {/*<Input {...register('name', {required: {value: true, message: 'Заполните Phone'}})} id={"name"} />*/}
          {/*<label htmlFor="name">*/}
          {/*    Заполните имя*/}
          {/*</label>*/}
          {/*<Input {...register('lastName', {required: {value: true, message: 'Заполните login'}})} id={"lastName"} />*/}
          {/*<label htmlFor="lastName">*/}
          {/*    Заполните фамиллию*/}
          {/*</label>*/}
           <Button>Изменить данные</Button>
          {error === "ok"? (
            <div className={"p-10 bg-amber-200"}>
                <p>{error}</p>
              </div>
          ) : (
              <>
                {
                  error.length > 0 && <>
                     <Htag type='h2'>Ошибка редактирования данных</Htag>
              <div className={"p-10 bg-amber-200"}>
                <p>{error}</p>
              </div>
                  </>
                }
             
            </>
          )}
        </form>

      </div>
    </ProfileLayout>
  );
};
export default EditProfile;
