import {useForm} from "react-hook-form";
import {CommentFormProps, ICommentForm} from "./CommentForm.props";
import {Textarea} from "../../ui/textarea";
import {useState} from "react";
import axios from "axios";
import {DOMEN} from "../../../domen.api";
import {Label} from "../../ui/label";
import {Htag} from "../Htag/Htag";
import {Button} from "../../ui/button";
import {Input} from "../../ui/input";

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
        <form action="" className="space-y-5"  onSubmit={handleSubmit(onSubmit)}>
            <Htag type={"h1"}>Оставьте отзыв</Htag>
            <div >
                <div className={"flex space-x-5"}>
                    <div>
                        <Label htmlFor="title">Заголовок</Label>
                        <Input {...register('title', {required: {value: true, message: 'Заполните заголовок'}}) } placeholder={"title"} id={"title"}/>
                    </div>
                    <div>
                        <Label htmlFor="title">Фотография(опционально)</Label>
                        <Input accept="image/png, image/jpeg" type={'file'} {...register('files')} placeholder={"title"} id={"title"}/>
                    </div>

            </div>

                <Label htmlFor="title">Описание</Label>
                <Textarea {...register('comment', {required: {value: true, message: 'Заполните '}}) } placeholder={"description"} />
                <Button type={'submit'}> Оставить комментарий</Button>
            </div>
        </form>
    )
}