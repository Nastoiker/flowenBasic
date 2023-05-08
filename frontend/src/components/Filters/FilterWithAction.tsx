import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { useMemo, useState } from "react";

export const FilterWithAction = () => {
  const [withAction, setWithAction] = useState<boolean>(false);
  const onSubmit = () => {
    dispatch();
  };
  return (
    <>
      <Label htmlFor={"withSale"}>Со скидкой</Label>
      <Checkbox onSubmit={() => onSubmit} id={"withSale"} />
    </>
  );
};
