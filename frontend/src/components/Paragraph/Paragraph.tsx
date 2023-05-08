import { FC } from "react";
import { paragraphProps } from "./paragraph.props";
import cn from "classnames";
import styles from "./paragraph.module.css";

export const Paragraph: FC<paragraphProps> = ({
  className,
  type,
  children,
  ...props
}) => {
  return (
    <p
      className={cn(className, [
        {
          [styles.small]: type === "small",
          [styles.medium]: type === "medium",
          [styles.large]: type === "large",
        },
      ])}
    >
      {children}
    </p>
  );
};
