import {useForm} from "react-hook-form";
import {ICreateBrandWithSecondCategory} from "../../../interfaces/admin.interface";
import axios from "axios/index";
import {DOMEN} from "../../../domen.api";
import {Input} from "../../ui/input";
import {IRegister} from "../../../interfaces/register.interface";
import {Label} from "../../ui/label";
import {useAppDispatch} from "../../store";
import {registerFetch, RegState} from "../../store/slices/register.slice";
import {Button} from "../../ui/button";
import {useEffect, useState} from "react";
import {Htag} from "../../components";
import {call} from "redux-saga/effects";
import {useNavigate} from "react-router-dom";
 const Register = () => {
    const {register, control, handleSubmit, formState: {errors}, watch} = useForm<IRegister>();
    const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const [error, setError] = useState<string>('');

     const redirectTo =  (to: string) => {
         navigate( to, { replace: true});
     };
     const password = watch('password', '');
     const confirmPassword = watch('confirmpassword', '');
     const passwordMismatch = password !== confirmPassword;
     const [showVerificationInput, setShowVerificationInput] = useState(false);
     useEffect(() => {
         if (showVerificationInput) {
             // добавление дополнительного инпута
             // например, можно использовать модальное окно
             // или просто добавить инпут в DOM
         }
     }, [showVerificationInput]);
    const onSubmit = async (formData: IRegister) => {
        console.log(formData);
        if(formData.password !== formData.confirmpassword) throw new Error('failed password')
        if(!showVerificationInput) {
            const response = await fetch( DOMEN.user.register, { method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if(!data.ok) {
                setError('Данный пользователь уже существует');
            }
            if (data.ok) {
                setShowVerificationInput(true);
            }
        } else {
            const { email, code } = formData;
            const response = await fetch( DOMEN.user.verify, { method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        email,
                        confirm: code,
                    }
                ),
            });
            const data = await response.json();
            if(!data.ok) {
                setError('Неверный код');
            } else {
                return redirectTo('/');
            }
        }

   };
    return <div className={"bg-white max-w-2xl space-y-6 my-20 m-auto rounded-3xl sm:p-10"}>
        <Htag type={'h2'} className={"text-center"}>Регистрация</Htag>
        <form action="" className={"space-b-4"}  onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor={"login"}>
                Логин
            </Label>
            <Input error={errors.login} { ...register('login', { required: {value: true, message: 'Заполните login'} })} id={"login"}/>
            <Label htmlFor={"email"}>
                email
            </Label>
            <Input error={errors.email} { ...register('email', { required: {value: true, message: 'Заполните email'} })} id={"email"}/>
            <Label htmlFor={"password"}>
                password
            </Label>
            <Input error={errors.password} type={"password"} { ...register('password', { required: {value: true, message: 'Заполните password'} })} id={"password"}/>
            <Label htmlFor={"password"}>
                Подтвердите пароль
            </Label>
            <Input error={errors.confirmpassword} type={"password"} { ...register('confirmpassword', { required: {value: true, message: 'Заполните confirmpassword'} })} id={"confirmpassword"}/>
            {passwordMismatch && (
                <p style={{ color: 'red' }}>Пароли не совпадают</p>
            )}
            <Button type={"submit"}>Регистрация</Button>
            {showVerificationInput && (<div className={"block"}>
                    <Label htmlFor={"code"}>
                        Код для верификации аккаунта
                    </Label>
                    <Input  className={""} {...register( "code", { required: true })} />

                </div>
            )}
            {error && <h1 className={"text-red-200"}>{error}</h1>}
        </form>
    </div>
}
export default Register;