import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface BrandProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  brand: Brand;
  isActive: boolean;
}
interface Brand {
  id: string;
  name: string;
  img: string;
}
