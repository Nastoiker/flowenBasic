import {Controller, useForm} from "react-hook-form";
import {CommentFormProps, ICommentForm} from "./CommentForm.props";
import {Textarea} from "../../ui/textarea";
import {Input} from "../../ui/input";
import {useState} from "react";
import axios from "axios";
import {DOMEN} from "../../../domen.api";
import {Label} from "../../ui/label";
import {Htag} from "../Htag/Htag";
import {Button} from "../../ui/button";
import {Rating} from "./Rating";
import {IReviewForm} from "./IReview.form";
import {ReviewFormProps} from "./Rating.props";

export const RatingForm = ({productId, ...props}: ReviewFormProps): JSX.Element => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<IReviewForm>();
    const [succes, setSuccesForm] = useState<boolean>(false);
    const [error, setErrorForm] = useState<string>();
    const [isOpened, setIsOpened] = useState<boolean>();
    const onSubmit = async (formData: IReviewForm) => {
        formData.productId = productId;
        try {
            const {data} = await axios.post(DOMEN.rating.setRating, {...formData}, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });
            console.log(data);
        } catch(e) {
            if(e instanceof Error ) {
                setErrorForm(e.message);
            }
        }
    };
    return(
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Controller control={control} name={'quantity'} render={({field,}) => (
                <Rating
                    isEditable
                    {...register('quantity', {required: {value: true, message: 'поставьте оценку'}})}
                    rating={Number(field.value)}
                    error={errors.quantity}
                    setRating={field.onChange}
                    ref={field.ref}
                    tabIndex={isOpened ? 0 : -1}
                />

            )}/>
            <Button type={'submit'}>оставить рейтинг</Button>
        </form>
    );
};