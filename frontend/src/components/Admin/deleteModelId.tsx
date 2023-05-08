import { useAppSelector } from "../../store";
import { useForm } from "react-hook-form";
import {
  DeleteProductId,
  ICreatePhone,
} from "../../../interfaces/admin.interface";
import { useState } from "react";
import { Htag } from "../Htag/Htag";
import { Button } from "../../ui/button";

export const DeleteModel = (): JSX.Element => {
  const phones = useAppSelector((state) => state.phone.phones);
  const [search, setIsSearch] = useState<string>("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeleteProductId>();
  const filtered = phones.filter((t) => t.name.includes(search));
  return (
    <div className={"p-10 bg-white space-y-5 rounded-3xl text-center"}>
      <select className="mx-auto text-center block" {...register("id")}>
        <input type="text" onChange={(e) => setIsSearch(e.type)} />
        <Htag type={"h1"}>Удалить модель</Htag>
        {filtered.map((t) => {
          return (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          );
        })}
      </select>
      <Button>Удалить модель</Button>
    </div>
  );
};
