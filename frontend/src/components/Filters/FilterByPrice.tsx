import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {Input} from "../Input/Input";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css'
import {useAppDispatch, useAppSelector} from "../../store";
import {getByPrice} from "../../store/slices/phones.slices";
import {Button} from "../../ui/button";
export const FilterByPrice = () => {
    const [valueMax, setValueMax] = useState<number>(200000);
    const [valueMin, setValueMin] = useState<number>(10000);
    const dispatch = useAppDispatch();
    console.log(valueMax);
    function TodoList(minPrice: number, maxPrice: number) {
            dispatch(getByPrice({minPrice, maxPrice}));
        // useMemo(
        //     () => phones.filter( p => p.product.filter( w => w.price > minPrice && w.price < maxPrice )),
        //     [phones]
        // )
    }        // ...

    // const handleChange = ([low, high]) => {
    //     setValueMin(low);
    //     setValueMax(high);
    //     if (!onchange) {
    //         return console.log('please pass onChange method to LogarithmicRange')
    //     }
    // }
    const handleChange = ([low, high]: number[]) => {
        if(low > valueMax) return;
        if(low === valueMax) return;
        if(high === valueMin) return;
        if(high < valueMin) return;
        setValueMin(low);
        setValueMax(high);
        if (!onchange) {
            return console.log('please pass onChange method to LogarithmicRange')
        }
    }
    return <div >
        <Slider
            range
            // reverse={true}
                allowCross={true}

                 value={[valueMin, valueMax]} step={1000} min={10000} max={200000} onChange={handleChange}/>

        {/*<Input type="range" min={'10000'} max={'200000'} step={'500'} value={value} onChange={(e) => setValue(e.target.value)}/>*/}
        <div><Input onChange={(e) => {setValueMin(e.target.value)}} value={valueMin}/><Input onChange={(e) => {setValueMax(e.target.value)}} value={valueMax}/></div>
        <Button onClick={ () => {dispatch(getByPrice({minPrice: valueMin, maxPrice:valueMax}))}}>Сохранить</Button>
    </div>;
}