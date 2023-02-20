import {Input} from "../../ui/input";
import {useState} from "react";
import {Button} from "../../ui/button";

const Authorization = (): JSX.Element => {
    const [isCorrect, setCorrect] = useState<boolean>(false);
 return (<div className={"bg"}>
     <h1>Авторизация</h1>
     <Input placeholder={"email"} />
     <Input placeholder={"password"} />
     {
         isCorrect ? <Button>d</Button> : <Button>Авторизироваться</Button>
     }

 </div>)};
export default Authorization;