import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface buttonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  appearance: "ghost" | "green";
}
