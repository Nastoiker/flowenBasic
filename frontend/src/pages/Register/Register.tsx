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
    const {register, control, handleSubmit, formState: {errors}, reset} = useForm<IRegister>();
    const dispatch = useAppDispatch();
    const onSubmit = async (formData: IRegister) => {
        console.log(formData);
        dispatch(registerFetch(formData));
    };
    return <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor={"login"}>
                Логин
            </Label>
            <Input { ...register('login', { required: true })} id={"login"}/>
            <Label htmlFor={"email"}>
                email
            </Label>
            <Input { ...register('email', { required: true })} id={"email"}/>
            <Label htmlFor={"password"}>
                password
            </Label>
            <Input  type={"password"} { ...register('password', { required: true })} id={"password"}/>
            <Button type={"submit"}>Регистрация</Button>
        </form>
    </div>
}
export default Register;