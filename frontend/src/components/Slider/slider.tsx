import {sliderProps} from "./slider.props";
import {useState} from "react";
import {ReactComponent as Arrow } from './arrow.svg';
import cn from "classnames";
import './slider.styles.css';
const FADE_DURATION = 300;
export const Slider = ({sliders}: sliderProps): JSX.Element => {
    const [slide, setSlide] = useState<number>(0);
    const [fateState, setFateState] = useState<'fade-in' | 'fade-out'>('fade-in');
    const [currentTimer, setCurrentTimes] = useState<NodeJS.Timeout>();
    const handleClick = (move: number) => {
        const times = setTimeout(() => {
            setSlide((s ) => s + move);
            setFateState('fade-in');
        }, FADE_DURATION);
        clearTimeout(currentTimer);
        setFateState('fade-out');
        setCurrentTimes(times);
    };
    return <div className={"flex"}>
        <div className={cn("transition ease-in-out delay-200 ", fateState)}>
            <div>{sliders[slide].text}</div>
            <div></div>
            <div></div>
        </div>
        <div>
        </div>
        { slide > 0 && <button className={"rotate-180 hover:opacity-5"}  onClick={() => handleClick(-1)}>
            <Arrow/>
        </button>}
        { slide < sliders.length-1&&  <button  className={" hover:opacity-5"} onClick={() => handleClick(1)}>
            <Arrow/>
        </button> }

    </div>
}