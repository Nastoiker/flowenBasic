import { useAppSelector } from "../../store";
import { useForm } from "react-hook-form";
import { ICreateSecondCategoryWithBrand } from "../../../interfaces/admin.interface";
import { Input } from "../Input/Input";
import { Label } from "../../ui/label";
import axios from "axios";
import { DOMEN } from "../../../domen.api";
import { Htag } from "../Htag/Htag";
import { Button } from "../../ui/button";

export const CreateSecondCategoryWithBrand = (): JSX.Element => {
  const brands = useAppSelector((state) => state.brands.brands);
  const firstLevel = useAppSelector((state) => state.firstCategory.category);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateSecondCategoryWithBrand>();
  const onSubmit = async (formData: ICreateSecondCategoryWithBrand) => {
    console.log(formData);
    try {
      const { data } = await axios.post(
        DOMEN.admin.createCategory,
        { ...formData },
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
        <Label htmlFor={"alias"}>name alias</Label>
        <Input {...register("alias", { required: true })} id={"alias"} />
        <Label htmlFor={"name"}>name category</Label>
        <Input {...register("name", { required: true })} id={"name"} />
        <Label htmlFor={"alias"}>firstLevelId</Label>
        <select
          className="mx-auto text-center block"
          {...register("firstLevelId")}
        >
          {firstLevel?.map((t) => {
            return (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            );
          })}
        </select>
        <Label htmlFor={"brands"}>brands</Label>

        <select
          multiple
          className="mx-auto text-center block"
          {...register("id")}
        >
          {brands?.map((b) => {
            return (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            );
          })}
        </select>
        <Button type={"submit"}>Создать</Button>
      </form>
    </>
  );
};
