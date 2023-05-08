import { FC } from "react";
import styles from "./tag.module.css";
import cn from "classnames";
import { TagProps } from "./tag.props";

export const Tag: FC<TagProps> = ({ className, type, children, ...props }) => {
  return (
    <div
      className={cn(className, [
        {
          [styles.small]: type === "green",
          [styles.medium]: type === "red",
        },
      ])}
      {...props}
    >
      {children}
    </div>
  );
};
