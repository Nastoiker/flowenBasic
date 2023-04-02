import {useSwiper} from "swiper/react";

export default function SlideNextButton() {
    const swiper = useSwiper();

    return (
        <>
            <button onClick={() => swiper.slideNext()}>Slide to the next slide</button>
            <button onClick={() => swiper.slidePrev()}>Slide to the before slide</button>
        </>


);
}