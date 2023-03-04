import {Htag} from "../Htag/Htag";
import {CommentProps} from "./Comment.props";
import {Paragraph} from "../Paragraph/Paragraph";
import {useEffect, useState} from "react";
import {setCurrentModel} from "../../store/slices/phones.slices";
import {Profile} from "../../../interfaces/product.interfaces";
import { ru } from 'date-fns/locale';
import { format, addMonths }  from 'date-fns';
import {convertDate} from "../../helper/convertDate";
export const Comment = ({userId, comment, title, images, date }: CommentProps) : JSX.Element => {
    const [user, setUser] = useState<Profile>();
    const api_url = 'http://localhost:8000';

    const [loading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        (async () => {
            const res = await fetch(  `http://localhost:8000/users/acc:${userId}`);
            const user = await res.json();
            await new Promise((resolve) => setTimeout(() => resolve(''), 1000));
            if(!user) {
                return;
            } else {
                setUser(user);
                setIsLoading(true);
            }
        })();
    }, []);

    if(!user) return <div></div>;
    const avatar = api_url + '/user/avatar/' + user.id + '/';
    const dateformat = convertDate(date);
    return (<div className={"flex"}>
            {  user.avatar ?         <img src={avatar + user.avatar } className="rounded-full w-24 h-24" alt="avatar"/> : <img src={'icon'} className="rounded-full" alt="avatar"/>}
        <div>
            <span>{dateformat}</span>
            <Htag type={"h3"}>
                {user.login}
            </Htag>
            <Htag type={"h1"}>
                {title}
            </Htag>
            <Paragraph type={"medium"}>{comment}</Paragraph>
        </div>
        { images && images.map(image => <img src={`${image}`} className={"rounded-md"} alt="photoComments"/>)}
    </div>);
}