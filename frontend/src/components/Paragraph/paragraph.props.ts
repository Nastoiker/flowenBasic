import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface paragraphProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  type: "small" | "medium" | "large";
  children: ReactNode;
}
