import {useForm} from "react-hook-form";
import {Input} from "../../ui/input";
import {IEditProfile} from "./Profile.interface";
import {DOMEN} from "../../../domen.api";
import {useState} from "react";
import {Htag} from "../Htag/Htag";
import axios from "axios";
import {Button} from "../../ui/button";

export const EditProfile = (): JSX.Element => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<IEditProfile>();
    const [error, setErrorForm] = useState<string>();
    const Submit = async (formData: IEditProfile) => {
        try {
            const {data} = await axios.post(DOMEN.user.editProfile, {...formData});
            setErrorForm('');
        } catch(e) {
            if(e instanceof Error ) {
                setErrorForm(e.message);
            }
        }
    };
    return (
        <>
            <Htag type={"h1"}>Редактирование профиля</Htag>
            <form action="" onSubmit={handleSubmit(Submit)}>
                <label htmlFor="phone">
                    Заполните номер
                </label>
                <Input {...register('phone', {required: {value: true, message: 'Заполните Phone'}})} id={"phone"} />
                <label htmlFor="login">
                    Заполните никнейм
                </label>
                <Input {...register('login', {required: {value: true, message: 'Заполните login'}})} id={"login"} />
                <label htmlFor="phone">
                    Заполните номер
                </label>
                {/*<h1>Персональные данные</h1>*/}
                {/*<Input {...register('name', {required: {value: true, message: 'Заполните Phone'}})} id={"name"} />*/}
                {/*<label htmlFor="name">*/}
                {/*    Заполните имя*/}
                {/*</label>*/}
                {/*<Input {...register('lastName', {required: {value: true, message: 'Заполните login'}})} id={"lastName"} />*/}
                {/*<label htmlFor="lastName">*/}
                {/*    Заполните фамиллию*/}
                {/*</label>*/}
                {
                    error ?   <Button>Изменить данные</Button> :  <><Button>Ошибка редактирования данных</Button>
                        <div className={"bg-red-500"}><p></p></div>
                    </>
                }
            </form>
        </>

    )
}