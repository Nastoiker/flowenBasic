import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface htagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type: "h1" | "h2" | "h3" | "h4";
  children: ReactNode;
}
