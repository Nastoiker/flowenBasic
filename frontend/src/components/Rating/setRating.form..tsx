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
        console.log(formData);
        try {
            const {data} = await axios.post(DOMEN.rating.setRating, {...formData});
        } catch(e) {
            if(e instanceof Error ) {
                setErrorForm(e.message);
            }
        }
    };


    return(
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Controller control={control} name={'rating'} render={({field,}) => (
                <Rating
                    isEditable
                    {...register('rating', {required: {value: true, message: 'поставьте оценку'}})}
                    rating={field.value}
                    error={errors.rating}
                    setRating={field.onChange}
                    ref={field.ref}
                    tabIndex={isOpened ? 0 : -1}
                />

            )}/>

        </form>
    );
};