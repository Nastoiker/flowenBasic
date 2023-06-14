import { useAppSelector } from "../../store";
import { useForm } from "react-hook-form";
import {
  DeleteProductId,
  ICreatePhone,
} from "../../../interfaces/admin.interface";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Htag } from "../Htag/Htag";

export const DeleteProduct = (): JSX.Element => {
  const phones = useAppSelector((state) => state.phone.phones);
  const [search, setIsSearch] = useState<string>("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeleteProductId>();
  const getPhoneByModels = phones?.map((m) => m.product.map((p) => p)).flat();
  const filtered = getPhoneByModels?.filter((t) => t.name.includes(search));
  return (
    <div className={"p-10 bg-white space-y-5 rounded-3xl text-center"}>
      <Htag type={"h1"}>Удалить продукт</Htag>
      <select className="mx-auto text-center block" {...register("id")}>
        <input type="text" onChange={(e) => setIsSearch(e.type)} />
        {filtered?.map((t) => {
          return (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          );
        })}
      </select>
      <Button>Удалить</Button>
    </div>
  );
};
