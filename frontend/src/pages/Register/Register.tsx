import {Input} from "../../ui/input";
import {Label} from "../../ui/label";
import {Button} from "../../ui/button";
import { useForm } from 'react-hook-form';

const Register = () => {
    return (<div>
        <Label htmlFor={"login"} >Логин</Label>
        <Input placeholder={"login"} id={"login"}/>
        <Label htmlFor={"email"} >Email</Label>
        <Input placeholder={"email"} id={"email"} />
        <Label htmlFor={"email"} >Пароль</Label>
        <Input placeholder={"password"} id={"email"} />
        <Button>Авторизация</Button>
    </div>);
}
export default  Register;