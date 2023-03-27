export interface  BrandsContainerProps {
    brands: Brand[];
}
interface Brand {
   name: string;
  alias: string;
  img: string
}