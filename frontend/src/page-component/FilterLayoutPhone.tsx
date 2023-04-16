import {ProductModel, SmartPhone} from "../../interfaces/product.interfaces";
import {useEffect, useState} from "react";
import Slider from "rc-slider";
import {Input} from "../components/Input/Input";
import {Button} from "../ui/button";
import 'rc-slider/assets/index.css'

import {getByPrice} from "../store/slices/phones.slices";
import {FilterWithAction} from "../components/Filters/FilterWithAction";
import {FilterByPrice} from "../components/Filters/FilterByPrice";
import {PhoneCard} from "../components/Product/Card/phone.card";
import {api_url} from "../../domen.api";
import {Htag} from "../components";
import {ProductConvertImageNotModel} from "../helper/convertImagePath";

export const FilterLayoutPhone = ({phones, text}: { phones: SmartPhone[], text: string}) => {
    const [valueMax, setValueMax] = useState<number>( Math.max(...phones.map( p => p.price)));
    const [valueMin, setValueMin] = useState<number>( Math.min(...phones.map( p => p.price)));
    const [filteredPhones, setFilteredPhones] = useState<SmartPhone[]>(phones);
    const changeFilteredPhone = (minPrice: number, maxPrice: number) => {
        const models:SmartPhone[] = [];
        console.log(minPrice, maxPrice);
        for( const model of phones) {
                if(model.price >= minPrice && model.price <= maxPrice ) {
                    models.push(model);
                }
            console.log(1);
        }
        setFilteredPhones(models);
    }
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
    const [show, setShow] = useState<boolean>();
    return <div className={""}>
        <div className={"absolute my-20"}>
            <Button className="l-0" onClick={() => setShow((c )=> !c )}>Фильтры</Button>
            {
                show && <div className={"z-50 rounded-2xl  p-10 space-ys-5 bg-white"}>

                    <div>
                        <h1>Цена</h1>
                        <Slider
                            range
                            allowCross={true}

                            value={[valueMin, valueMax]} step={1000} min={Math.min(...phones.map( p => p.price))} max={Math.max(...phones.map( p => p.price))} onChange={handleChange}/>

                        {/*<Input type="range" min={'10000'} max={'200000'} step={'500'} value={value} onChange={(e) => setValue(e.target.value)}/>*/}
                        <div className={"space-y-5 py-5"}><Input onChange={(e) => {setValueMin(e.target.value)}} value={valueMin}/><Input onChange={(e) => {setValueMax(e.target.value)}} value={valueMax}/></div>
                        <Button onClick={ () => {changeFilteredPhone( valueMin, valueMax)}}>Сохранить</Button>
                    </div>
                </div>
            }
        </div>
        <Htag type={'h1'}>{text}</Htag>
        <div className={"max-[574px]:text-center min-[920px]:grid gap-40px gap-y-6 grid-cols-2 justify-items-stretch"}>
            {
                (filteredPhones) ? filteredPhones.map(p =><PhoneCard alias={p.alias} key={p.name} name={p.name + `\r${p.ColorAlias}`} img={ProductConvertImageNotModel(p)} price={p.price} /> ) :
                    <div className={" text-center my-20 m-auto"}>        <Htag type={'h1'}>К сожалению ничего не найдено</Htag><Button>Вернуться на главную</Button></div>
            }

        </div>
    </div>;
}