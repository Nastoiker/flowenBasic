import {Input} from "../../ui/input";
import {useAppSelector} from "../../store";
import {ProfileImage} from "../../helper/convertImagePath";
import {userState} from "../../store/slices/user.slice";
import {DOMEN} from "../../../domen.api";
import {useState} from "react";
import {Button} from "../../ui/button";
import {Htag} from "../Htag/Htag";

export const UpdateAvatarProfile = () => {
    const user = useAppSelector<userState>(state => state.user.user);
    const [error, setError] = useState<string>();
    const [file, setFile] = useState<File>();
    const [selectedFile, setSelectedFile] = useState<any>();
    let image;
    if (user.avatar && user.avatar?.length> 0) {
            image = ProfileImage(user);
    }
    const onSelectFile = (e: any) => {
        e.preventDefault();
        const reader = new FileReader();

        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        const file = e.target.files[0];
        setFile(file);
        uploadedFile(file);
    }
    const uploadedFile = (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setSelectedFile(reader.result);

        };
    };
    const onDrop = (e: any) =>  {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        uploadedFile(file);
    }
    const onSubmit = async () => {
        const formData = new FormData();
        if(!file) return;
        formData.set('files', file);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(DOMEN.user.updateAvatar, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                },
                method: 'POST',
                body: {
                    ...formData,
                },
            });
            await new Promise( (resolve) => setTimeout(() => resolve(''), 1000));
            const data = await res.json();
        } catch (e) {
            setError(e.message);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    return (<>
        <Htag type={"h1"}>Ваша аватарка </Htag>
        <form action="" onSubmit={() => onSubmit()}>
            <div onDrop={onDrop}   onDragOver={handleDragOver}>
                <p>sadasdsadasd</p>
                <p>
                    asdasdasd
                </p>
                <p>asdasdasd</p>
                <Button type='submit'>Изменить фото</Button>
            </div>
        </form>
        {
            image ?   <div className={"bg-white"}>
                <div id="imagePreview" className={`bg-[url('${image}')]`}>
                </div>
                <img src={image} alt="Preview" />

            </div> : <div className={"bg-white"}>
                <img src="" alt=""/>
            </div>

        }

        <div className="avatar-preview">
            <img src={selectedFile} alt="Preview" />
        </div>
    </>);
}