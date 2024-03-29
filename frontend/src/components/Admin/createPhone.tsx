import { useForm, Controller } from "react-hook-form";
import { ICommentForm } from "../Comment/CommentForm.props";
import { useEffect, useState } from "react";
import axios from "axios";
import { DOMEN } from "../../../domen.api";
import { Htag } from "../Htag/Htag";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { Input } from "../Input/Input";
import { ICreatePhone } from "../../../interfaces/admin.interface";
import { Textarea } from "../../ui/textarea";
import { setCurrentModel } from "../../store/slices/phones.slices";
import { useAppSelector } from "../../store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Tag } from "../../../interfaces/product.interfaces";

export const CreatePhone = () => {
  const brands = useAppSelector((state) => state.brands.brands);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreatePhone>();
  const [succes, setSuccesForm] = useState<boolean>(false);
  const [error, setErrorForm] = useState<string>();
  const models = useAppSelector((state) => state.phone.phones);
  const [tags, setTags] = useState<Tag[]>();
  useEffect(() => {
    (async () => {
      const res = await fetch(DOMEN.product.tags);
      const tags = await res.json();
      await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
      setTags(tags);
    })();
  }, []);
  const onSubmit = async (formData: ICreatePhone) => {
    const files = formData.files;
    //нужный кастыль
    // @ts-ignore
    delete formData.files;
    const price = Number(formData.price);
    const oldPrice = Number(formData.oldPrice);
    const quantity = Number(formData.quantity);
    const Ram = Number(formData.Ram);
    const Memory = Number(formData.Memory);
    let idProduct;
    console.log(Ram);
    const form = { ...formData, price, oldPrice, quantity, Ram, Memory };
    console.log(form);
    try {
      const { data } = await axios.post(
        DOMEN.admin.createProduct,
        { ...form },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbXVyMjAwNEBnbWFpbC5jb20iLCJpYXQiOjE2NzUzMzI2OTB9.T2hefmVdkX_Zg54NtF_OAg-6u0N6-uk8nqVcWn22Rbs",
          },
        }
      );
      if (data.message) {
        setSuccesForm(true);
        reset();
      } else {
        setErrorForm("что-то пошло не так");
      }
      idProduct = data.id;
      console.log("data" + data.id);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        setErrorForm(e.message);
      }
    }
    await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
    try {
      // @ts-ignore
      const imageData = { files: files[0], productId: idProduct };
      console.log(imageData);
      const { data } = await axios.post(
        DOMEN.admin.updatePictureProduct,
        { ...imageData },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbXVyMjAwNEBnbWFpbC5jb20iLCJpYXQiOjE2NzUzMzI2OTB9.T2hefmVdkX_Zg54NtF_OAg-6u0N6-uk8nqVcWn22Rbs",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.message) {
        setSuccesForm(true);
        reset();
      } else {
        setErrorForm("что-то пошло не так");
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        setErrorForm(e.message);
      }
    }
  };
  return (
    <div>
      <Htag type={"h2"}>Создать продукта</Htag>
      <form
        action=""
        className="bg-white space-y-8 rounded-3xl text-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label htmlFor={"name"}>Имя</Label>
        <Input
          error={errors.name}
          {...register("name", { required: true })}
          id={"name"}
        />
        <Label htmlFor={"Description"}>Описание</Label>
        <Textarea
          {...register("Description", { required: true })}
          id={"Description"}
        />
        <Label htmlFor={"alias"}>алиас</Label>
        <Input {...register("alias", { required: true })} id={"alias"} />
        <Label htmlFor={"memory"}>памяти</Label>
        <Input
          type={"number"}
          {...register("Memory", { required: true })}
          id={"memory"}
        />
        <Label htmlFor={"ram"}>ram</Label>
        <Input
          type={"number"}
          {...register("Ram", { required: true })}
          id={"ram"}
        />
        <Label htmlFor={"price"}>Цена</Label>
        <Input
          type={"number"}
          {...register("price", { required: true })}
          id={"price"}
        />
        <Label htmlFor={"oldPrice"}>Старая цена</Label>
        <Input type={"number"} {...register("oldPrice")} id={"oldPrice"} />
        <Label htmlFor={"image"}>Фото для телефона</Label>

        <Input
          accept="image/png, image/jpeg"
          type={"file"}
          {...register("files")}
          id={"image"}
        />

        <Label htmlFor={"TagId"}>Теги</Label>
        <select className="mx-auto text-center block" {...register("TagId")}>
          {tags?.map((t) => {
            return (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            );
          })}
        </select>

        <Label htmlFor={"Color"}>Цвет</Label>
        <Input {...register("Color")} id={"Color"} />

        <Label htmlFor={"ColorAlias"}>Алиас цвета</Label>
        <Input {...register("ColorAlias")} id={"ColorAlias"} />

        <Label htmlFor={"brandId"}>бренд</Label>
        <select className="mx-auto text-center block" {...register("brandId")}>
          {brands.map((b) => {
            return (
              <option key={b.id} value={b.name}>
                {b.name}
              </option>
            );
          })}
        </select>

        <Input
          type={"number"}
          {...register("quantity", { required: true, min: 0 })}
          placeholder={"кол-во на складе"}
          id={"quantity"}
        />
        <Label htmlFor={"modelDeviceId"}>Модель</Label>
        <select
          id={"modelDeviceId"}
          className="mx-auto text-center block"
          {...register("modelDeviceId")}
        >
          {models?.map((m) => {
            return (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            );
          })}
        </select>
        <Button type={"submit"}> Создать</Button>
      </form>
    </div>
  );
};
