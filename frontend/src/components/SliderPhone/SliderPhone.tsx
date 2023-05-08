import Slider from "react-slick";

import { SliderPhoneProps } from "./SliderPhoneProps";
import { api_url } from "../../../domen.api";

export const SliderPhone = ({ products }: SliderPhoneProps): JSX.Element => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  console.log(products);
  return (
    <>
      <Slider {...settings}>
        {products.map((m) => {
          return m.product.map((p) => {
            const pict = p.image.split(",");
            return (
              <div key={p.id}>
                <div className="card">
                  {/*<img src={`${api_url}/product/${m.brand.name}/${m.name.replace(" ", "-")}/${p.ColorAlias}/${pict[0]}`} alt={p.name} />*/}
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.price}</p>
                  </div>
                </div>
              </div>
            );
          });
        })}
        ,
      </Slider>
    </>
  );
};
