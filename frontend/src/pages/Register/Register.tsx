import {useForm} from "react-hook-form";
import {ICreateBrandWithSecondCategory} from "../../../interfaces/admin.interface";
import axios from "axios/index";
import {DOMEN} from "../../../domen.api";
import {Input} from "../../ui/input";
import {IRegister} from "../../../interfaces/register.interface";
import {Label} from "../../ui/label";
import {useAppDispatch} from "../../store";
import {registerFetch} from "../../store/slices/register.slice";
import {Button} from "../../ui/button";
 const Register = () => {
    const {register, control, handleSubmit, formState: {errors}, reset, watch} = useForm<IRegister>();
    const dispatch = useAppDispatch();
     const password = watch('password', '');
     const confirmPassword = watch('confirmpassword', '');
     const passwordMismatch = password !== confirmPassword;
    const onSubmit = async (formData: IRegister) => {
        console.log(formData);
        if(formData.password !== formData.confirmpassword) throw new Error('failed password')
        dispatch(registerFetch(formData));
    };
    return <div className={"bg-white max-w-2xl space-y-6 my-20 m-auto rounded-3xl sm:p-10"}>
        <h1 className={"text-center"}>Регистрация</h1>
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
        </form>
    </div>
}
export default Register;