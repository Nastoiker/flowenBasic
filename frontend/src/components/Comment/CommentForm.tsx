import {useForm} from "react-hook-form";
import {CommentFormProps, ICommentForm} from "./CommentForm.props";
import {Textarea} from "../../ui/textarea";
import {Input} from "../../ui/input";
import {useState} from "react";
import axios from "axios";
import {DOMEN} from "../../../domen.api";
import {Label} from "../../ui/label";

export const CommentForm = ({modelProductId, userId, Data, ...props}: CommentFormProps): JSX.Element => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<ICommentForm>();
    const [succes, setSuccesForm] = useState<boolean>(false);
    const [error, setErrorForm] = useState<string>();
    const onSubmit = async (formData: ICommentForm) {
        try {
            const {data} = await axios.post(DOMEN.comment.createComment, {...formData})
        } catch(e) {
            if(e instanceof Error ) {
                setErrorForm(e.message);
            }
        }
    }
    return(
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Label htmlFor="title">Your message</Label>
                <Input placeholder={"title"} id={"title"} label={"Заголовок"}/>
                <Textarea placeholder={"text"} />
            </div>
        </form>
    )
}