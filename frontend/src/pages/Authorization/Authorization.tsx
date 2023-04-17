import {Input} from "../../ui/input";
import {useState} from "react";
import {Button} from "../../ui/button";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../../store";
import {useForm} from "react-hook-form";
import {ILogin, IRegister} from "../../../interfaces/register.interface";
import {loginFetch} from "../../store/slices/auth.slice";
import {redirect, useNavigate} from "react-router-dom";

const Authorization = (): JSX.Element => {
    const [isCorrect, setCorrect] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const redirectTo =  (to: string) => {
        navigate(to);
    };
    const {register, control, handleSubmit, formState: {errors}, reset} = useForm<IRegister>();
    const onSubmit = async (formData: ILogin) => {
        try {
            dispatch(loginFetch(formData));
            if(localStorage.getItem('token')) {
                navigate('/');
            }
        } catch(e) {
            if(e instanceof Error ) {
                console.log(e.message);
            }
        }
    }
    return (<div className={"bg-white  m-10 max-w-2xl space-y-6 md:mx-auto rounded-3xl text-center p-10"}>
        <h1>Авторизация</h1>

        <form action=""  className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <Input error={errors.email} {...register('email', { required: {value: true, message: 'Заполните email'} })} placeholder={"email"} />
            <Input error={errors.email} type={"password"}  {...register('password', { required: {value: true, message: 'Заполните password'} })} placeholder={"password"} />
            {
                isCorrect ? <Button>d</Button> : <Button>Авторизироваться</Button>
            }
        </form>
 </div>)};
export default Authorization;