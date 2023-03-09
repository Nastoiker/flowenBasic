import {Input} from "../../ui/input";
import {useAppSelector} from "../../store";
import {ProfileImage} from "../../helper/convertImagePath";
import {userState} from "../../store/slices/user.slice";
import {DOMEN} from "../../../domen.api";
import {useState} from "react";
import {Button} from "../../ui/button";

export const UpdateAvatarProfile = () => {
    const user = useAppSelector<userState>(state => state.user.user);
    const [error, setError] = useState<string>();
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    if(user.avatar) {
        const image = ProfileImage(user);
    }
    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
    const onSubmit = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(DOMEN.user.updateAvatar, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                method: 'POST',
                body: '',
            });
            await new Promise(async (resolve) => setTimeout(() => resolve(''), 1000));
            const data = await res.json();
        } catch (e) {
            setError(e.message);
        }
    };
}
    return <>
        <Htag type={"h1"}>Ваша аватарка </Htag>
        <form action="" onSubmit={onSubmit()}>
            <input  type={"file"}  accept=".png, .jpg, .jpeg" className={'input-field'} hidden/>
            <Button type='submit'>Изменить фото</Button>
        </form>
        <div className="avatar-preview">
            <div id="imagePreview" className={`bg-[url('${image}')]`}>
            </div>
        </div>
    </>;
}