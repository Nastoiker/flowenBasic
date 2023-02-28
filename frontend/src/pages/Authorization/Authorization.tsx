import {Input} from "../../ui/input";
import {useState} from "react";
import {Button} from "../../ui/button";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../../store";
import {useForm} from "react-hook-form";
import {ILogin, IRegister} from "../../../interfaces/register.interface";
import {loginFetch} from "../../store/slices/auth.slice";
import {redirect} from "react-router-dom";

const Authorization = (): JSX.Element => {
    const [isCorrect, setCorrect] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {register, control, handleSubmit, formState: {errors}, reset} = useForm<IRegister>();
    const onSubmit = async (formData: ILogin) => {
        try {
            dispatch(loginFetch(formData));
            if(localStorage.getItem('token')) {
                redirect('/');
            }
        } catch(e) {
            if(e instanceof Error ) {
                console.log(e.message);
            }
        }
    }
    return (<div className={"bg"}>
        <h1>Авторизация</h1>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('email', { required: true })} placeholder={"email"} />
            <Input  {...register('password', { required: true })} placeholder={"password"} />
            {
                isCorrect ? <Button>d</Button> : <Button>Авторизироваться</Button>
            }
        </form>
 </div>)};
export default Authorization;