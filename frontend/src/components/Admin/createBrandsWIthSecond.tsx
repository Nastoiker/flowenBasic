import { useAppSelector } from "../../store";
import { useForm } from "react-hook-form";
import {
  ICreateBrandWithSecondCategory,
  ICreateSecondCategoryWithBrand,
} from "../../../interfaces/admin.interface";
import { Input } from "../Input/Input";
import { Label } from "../../ui/label";
import axios from "axios";
import { DOMEN } from "../../../domen.api";
import { Htag } from "../Htag/Htag";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import { secondLevelCategory } from "../../../interfaces/product.interfaces";

export const CreateBrandsWIthSecond = (): JSX.Element => {
  const [secondCategory, setSecondCategory] = useState<secondLevelCategory[]>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateBrandWithSecondCategory>();
  useEffect(() => {
    (async () => {
      const res = await fetch(DOMEN.product.getByCategory, {
        method: "post",
      });
      const categories = await res.json();
      await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
      setSecondCategory(categories);
    })();
  }, []);
  const onSubmit = async (formData: ICreateBrandWithSecondCategory) => {
    const files = formData.files;
    //нужный кастыль
    // @ts-ignore
    delete formData.files;
    // @ts-ignore
    formData.files = files[0];
    const form = { categories: formData.categories, name: formData.name };
    console.log(form);
    try {
      const { data } = await axios.post(
        DOMEN.admin.createBrand,
        { ...form },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbXVyMjAwNEBnbWFpbC5jb20iLCJpYXQiOjE2NzUzMzI2OTB9.T2hefmVdkX_Zg54NtF_OAg-6u0N6-uk8nqVcWn22Rbs",
          },
        }
      );
      if (data.message) {
        reset();
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };
  return (
    <>
      <Htag type={"h1"}>Создание второй категории с брендами</Htag>
      <form
        action=""
        className="bg-white space-y-8 rounded-3xl text-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label htmlFor={"name"}>name brand</Label>
        <Input {...register("name", { required: true })} id={"name"} />
        <Input
          accept="image/png, image/jpeg"
          type={"file"}
          {...register("files")}
          id={"image"}
        />
        <Label htmlFor={"categories"}>secondCategories</Label>
        <select
          id="categories"
          multiple
          className="mx-auto text-center block"
          {...register("categories", { required: true })}
        >
          {secondCategory?.map((s) => {
            return (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            );
          })}
        </select>
        <Button type={"submit"}>Создать</Button>
      </form>
    </>
  );
};
