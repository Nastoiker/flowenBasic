import {useAppSelector} from "../../store";
import {useForm} from "react-hook-form";
import {DOMEN} from "../../../domen.api";
import {ICreateBrandWithSecondCategory} from "../../../interfaces/admin.interface";
import {IProfileAddress} from "./Profile.interface";
import axios from "axios";
import {Input} from "../../ui/input";
import {setSearch} from "../../store/slices/search.slice";
import {useState} from "react";
import {Label} from "../../ui/label";
import {Button} from "../../ui/button";
import cn from "classnames";
import {inspect} from "util";
import styles  from './profile.module.css';

export const EditAdress = () => {
    const user = useAppSelector(state => state.user.user).address;
    const token = localStorage.getItem('token');
    const [error, setError] = useState<boolean>(false);
    const {register, control, handleSubmit, formState: {errors}, reset} = useForm<IProfileAddress>();
    const onSubmit = (formData: IProfileAddress) => {
        try {
            if(!user) {
                const data = axios.post(DOMEN.user.editAddress, {...formData}, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                });
            } else {
                const data = axios.post(DOMEN.user.createAddress, {...formData}, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                });
            }

            setError(false);
        } catch (e: any) {
            setError(true);
        }

    };
    return <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor={'city'}>Город</Label>
            <Input {...register('city', { required: true})} name={"city"} id={'city'}/>
            <Label htmlFor={'country'}>Улица</Label>
            <Input {...register('street', { required: true})} name="street" id={'street'}/>
            <Label htmlFor={'country'}>Страна</Label>
            <Input value={'Russia'} {...register('country', { required: true})} id={'country'}/>
            <Button  className={cn({[styles.error]: error})} type={'submit'} > Сохранить</Button>
        </form>
    </div>;
}