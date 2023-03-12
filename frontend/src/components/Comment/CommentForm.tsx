import {useForm} from "react-hook-form";
import {CommentFormProps, ICommentForm} from "./CommentForm.props";
import {Textarea} from "../../ui/textarea";
import {useState} from "react";
import axios from "axios";
import {DOMEN} from "../../../domen.api";
import {Label} from "../../ui/label";
import {Htag} from "../Htag/Htag";
import {Button} from "../../ui/button";
import {Input} from "../Input/Input";

export const CommentForm = ({modelProductId, userId, ...props}: CommentFormProps): JSX.Element => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<ICommentForm>();
    const [succes, setSuccesForm] = useState<boolean>(false);
    const [error, setErrorForm] = useState<string>();
    const onSubmit = async (formData: ICommentForm) => {

        formData.modelDeviceId = modelProductId;
        const token = localStorage.getItem('token');
        const file = formData.files;
        const setData = {
            ...formData,
            // @ts-ignore
            files: file[0]
        };

        try {
            const {data} = await axios.post(DOMEN.comment.createComment, {...setData}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' +token
                }
            });
        } catch(e) {
            if(e instanceof Error ) {
                setErrorForm(e.message);
            }
        }
    }
    return(
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Htag type={"h1"}>Оставьте отзыв</Htag>
            <div>
                <Label htmlFor="title">Заголовок</Label>
                <Input {...register('title', {required: {value: true, message: 'Заполните заголовок'}}) } placeholder={"title"} id={"title"}/>
                <Input accept="image/png, image/jpeg" type={'file'} {...register('files')} placeholder={"title"} id={"title"}/>
                <Textarea {...register('comment', {required: {value: true, message: 'Заполните заголовок'}}) } placeholder={"text"} />
                <Button type={'submit'}> Оставить комментарий</Button>
            </div>
        </form>
    )
}