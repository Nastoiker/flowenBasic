import React, {useState, useEffect, useRef} from 'react';
import './CustomSlider.css';
interface SliderProps {
    slides: React.ReactNode[];
    autoplay?: boolean;
    interval?: number;
}



export const SliderBrans = ({ slides, autoplay = true, interval = 3000 }: SliderProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    const slideRef = useRef();

    useEffect(() => {
        setSlideWidth(slideRef.current.offsetWidth);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((currentSlide + 1) % slides.length);
        }, interval);
        return () => clearInterval(intervalId);
    }, [currentSlide, interval, slides.length]);

    return (
        <div className="slider">
            <div
                className="slides flex"
                style={{
                    transform: `translateX(-${currentSlide * slideWidth}px)`,
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        ref={slideRef}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        {slide}
                    </div>
                ))}
            </div>
        </div>
    );
};

