import { useSwiper } from "swiper/react";

export default function sadsd() {
  const swiper = useSwiper();

  return (
    <button onClick={() => swiper.slidePrev()}>Slide to the next slide</button>
  );
}
