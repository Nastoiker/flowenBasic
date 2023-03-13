import {ChangeEvent, useEffect, useState} from "react";
import {Input} from "../Input/Input";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css'
export const FilterByPrice = () => {
    const [valueMax, setValueMax] = useState<number>(20000);
    const [valueMin, setValueMin] = useState<number>(9000);
    console.log(valueMax);
    useEffect(() => {},
        [valueMax]);
    // const handleChange = ([low, high]) => {
    //     setValueMin(low);
    //     setValueMax(high);
    //     if (!onchange) {
    //         return console.log('please pass onChange method to LogarithmicRange')
    //     }
    // }
    const handleChange = ([low, high]) => {
        setValueMin(low);
        setValueMax(high);
        if (!onchange) {
            return console.log('please pass onChange method to LogarithmicRange')
        }
    }
    return <div>
        <Slider
            // reverse={true}
                allowCross={true}
                 value={[valueMin, valueMax]}  minValue={10000} maxValue={200000} onChange={handleChange}/>

        {/*<Input type="range" min={'10000'} max={'200000'} step={'500'} value={value} onChange={(e) => setValue(e.target.value)}/>*/}
        <div><h1></h1><h1></h1></div>
    </div>;
}