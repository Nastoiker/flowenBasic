import {useSwiper} from "swiper/react";
import {ReactComponent as Arrow} from "../Slider/arrow.svg";

export default function SlideNextButton() {
    const swiper = useSwiper();

    return (
        <>
            <button onClick={() => swiper.slidePrev()}> <Arrow className={"rotate-180"}/></button>

            <button onClick={() => swiper.slideNext()}> <Arrow/></button>
        </>


);
}