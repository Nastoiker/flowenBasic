import {useAppDispatch, useAppSelector} from "../../store";
import {useState} from "react";
import {userState} from "../../store/slices/user.slice";
import {Comment} from "../../components/Comment/Comment";
import {useForm} from "react-hook-form";
import {ICommentForm} from "../../components/Comment/CommentForm.props";
import {EditProfile} from "../../components/Profile/Edit.Profile";

function Profile() {
    const user = useAppSelector<userState>(state => state.user.user);
    const dispatch = useAppDispatch();
    const isEdited = useState<boolean>();
    const [openBasket, setIsOpenBasket] = useState<boolean>(false);
    const {register, control, handleSubmit, formState: {errors}} = useForm<ICommentForm>();
    const [openComment, setOpenComment] = useState<boolean>(false);
    return (<>
        <EditProfile />
    </>);
}
export default Profile;
