import { PropsWithChildren } from "react";
import { CheckBoxProps } from "./CheckBox.props";

export const Checkbox = ({
  text,
  className,
  isActive,
}: CheckBoxProps): JSX.Element => {
  return (
    <div className={className}>
      <label className="m-12310">
        <input defaultChecked={isActive && isActive} type="checkbox" />
        {text}
      </label>
    </div>
  );
};
