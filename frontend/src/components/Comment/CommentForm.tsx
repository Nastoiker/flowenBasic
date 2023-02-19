import {useForm} from "react-hook-form";
import {CommentFormProps, ICommentForm} from "./CommentForm.props";
import {Textarea} from "../../ui/textarea";
import {Input} from "../../ui/input";
import {useState} from "react";
import axios from "axios";
import {DOMEN} from "../../../domen.api";
import {Label} from "../../ui/label";
import {Htag} from "../Htag/Htag";

export const CommentForm = ({modelProductId, userId, ...props}: CommentFormProps): JSX.Element => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<ICommentForm>();
    const [succes, setSuccesForm] = useState<boolean>(false);
    const [error, setErrorForm] = useState<string>();
    const onSubmit = async (formData: ICommentForm) => {
        try {
            const {data} = await axios.post(DOMEN.comment.createComment, {...formData});
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
                <Textarea placeholder={"text"} />
            </div>
        </form>
    )
}