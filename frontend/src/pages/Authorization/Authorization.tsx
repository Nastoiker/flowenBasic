import {Input} from "../../ui/input";
import {useState} from "react";
import {Button} from "../../ui/button";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../../store";
import {useForm} from "react-hook-form";
import {IRegister} from "../../../interfaces/register.interface";

const Authorization = (): JSX.Element => {
    const [isCorrect, setCorrect] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {register, control, handleSubmit, formState: {errors}, reset} = useForm<IRegister>();
    const onSubmit = async (formData: IRegister) => {
        try {
            await dispatch();
        } catch(e) {
            if(e instanceof Error ) {
                console.log(e.message);
            }
        }
    }
    return (<div className={"bg"}>
     <h1>Авторизация</h1>
     <Input {...register('email', { required: true })} placeholder={"email"} />
     <Input  {...register('password', { required: true })} placeholder={"password"} />
     {
         isCorrect ? <Button>d</Button> : <Button>Авторизироваться</Button>
     }

 </div>)};
export default Authorization;