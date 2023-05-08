export interface BrandsContainerProps {
  brands: Brand[];
}
interface Brand {
  id: string;
  name: string;
  alias: string;
  img: string;
}
