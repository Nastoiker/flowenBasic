import {Input} from "../../ui/input";
import {useAppSelector} from "../../store";

export const UpdateAvatarProfile = () => {
    const user = useAppSelector<Iser>(state => state.user.user);
    return <>
        Ваша аватарка
        <form action="">
            <input  type={"file"}  accept=".png, .jpg, .jpeg" className={'input-field'} hidden/>
        </form>
        <div className="avatar-preview">
            <div id="imagePreview" style="background-image: url(http://i.pravatar.cc/500?img=7);">
            </div>
        </div>
    </>;
}