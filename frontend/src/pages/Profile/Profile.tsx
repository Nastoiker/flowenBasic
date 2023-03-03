import {useAppDispatch, useAppSelector} from "../../store";
import {useState} from "react";
import {userState} from "../../store/slices/user.slice";
import {Comment} from "../../components/Comment/Comment";

function Profile() {
    const user = useAppSelector<userState>(state => state.user.user);
    const dispatch = useAppDispatch();
    const isEdited = useState<boolean>();
    return (<>
        <div className={""}></div>
        <form action=""></form>
        <div>
            {
                user.comment?.map( c => {
                    <Comment />
                })
            }

        </div>
    </>);
}
export default Profile;
