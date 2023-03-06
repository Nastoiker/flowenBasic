import {useForm} from "react-hook-form";
import {Input} from "../../ui/input";
import {IEditProfile} from "./Profile.interface";
import axios from "axios/index";
import {DOMEN} from "../../../domen.api";
import {useState} from "react";
import {Htag} from "../Htag/Htag";

export const EditProfile = (): JSX.Element => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<IEditProfile>();
    const [error, setErrorForm] = useState<string>();
    const Submit = async (formData: IEditProfile) => {
        try {
            const {data} = await axios.post(DOMEN.user.editProfile, {...formData});
        } catch(e) {
            if(e instanceof Error ) {
                setErrorForm(e.message);
            }
        }
    };
    return (
        <>
            <Htag type={"h1"}>Редактирование профиля</Htag>
            <form action="">
                <Input {...register('phone', {required: {value: true, message: 'Заполните Phone'}})} />
                <Input {...register('login', {required: {value: true, message: 'Заполните login'}})} />
            </form>
        </>

    )
}