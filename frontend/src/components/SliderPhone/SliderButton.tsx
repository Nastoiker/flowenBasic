import { useSwiper } from "swiper/react";
import { ReactComponent as Arrow } from "../Slider/arrow.svg";

export default function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <div className={"flex justify-between"}>
      <button onClick={() => swiper.slidePrev()}>
        {" "}
        <Arrow className={"rotate-180"} />
      </button>

      <button onClick={() => swiper.slideNext()}>
        {" "}
        <Arrow />
      </button>
    </div>
  );
}
