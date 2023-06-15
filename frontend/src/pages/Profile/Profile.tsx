import { useAppDispatch, useAppSelector } from "../../store";
import { useState } from "react";
import { userState } from "../../store/slices/user.slice";
import { Comment } from "../../components/Comment/Comment";
import { useForm } from "react-hook-form";
import { ICommentForm } from "../../components/Comment/CommentForm.props";
import { EditProfile } from "../../components/Profile/Edit.Profile";
import BasketPage from "../Basket/Basket.page";
import { EditAdress } from "../../components/Profile/Edit.Adress";
import { Htag } from "../../components";
import { ProfileLayout } from "../../page-component/Profile.layot";
import { ProfileImage } from "../../helper/convertImagePath";
import {  ReactComponent as UserIcon } from "../../../public/icons/profile.svg";
import {Button} from "../../ui/button";
import {useNavigate} from "react-router-dom";
import {DOMEN} from "../../../domen.api";
import axios from "axios";
function Profile() {
  const user = useAppSelector<userState>((state) => state.user.user!);
  const dispatch = useAppDispatch();
  const isEdited = useState<boolean>();
  const [openBasket, setIsOpenBasket] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICommentForm>();
  const [openComment, setOpenComment] = useState<boolean>(false);
  const avatar = ProfileImage(user);
  const navigate = useNavigate();
  const [valueAvatar, setValueAvatar] = useState<string>(avatar);
  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
  const formData = new FormData();
  formData.set('files', file);
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setValueAvatar(reader.result as string)
    }
    const form = { files: file };
    await axios.post(DOMEN.user.uploadImage, {
      ...form
    }, {
      headers: {
        'Content-type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
  const redirectTo = (to: string) => {
    navigate(to, { replace: true });
  };
  return (
    <ProfileLayout>
      <div className={"mx-5 bg-white p-5 space-y-5 sm:p-10 rounded-3xl"}>
        <Htag type={"h1"}>Ваш профиль</Htag>
        {
            user?.email==='damur2004@gmail.com' && <Button onClick={() => redirectTo('/adminPage')}>Войти в админку</Button>
        }
        <div className={"mx-auto sm:flex justify-between"}>
<div>

  <img
      src={valueAvatar.length>0 ? valueAvatar : "../../../public/icons/profile.svg"}
      className={"rounded-full  mx-auto h-24 w-24"}
      alt=""
  />
  <label className={'my-5'} htmlFor={'avatarFile'}>
    <h1 className={'text-center'}>изменить аватар</h1>
    <input onChange={ (e) => uploadImage(e)} type={'file'} className={'hidden'} accept={'image/*'} id={'avatarFile'}/>
  </label>
</div>
          <div>
            <div className={"flex justify-between"}>
              <Htag type={"h2"}>login:</Htag>
              <Htag type={"h2"} className={"text-end"}>
                {user.login}
              </Htag>
            </div>
            <div className={"flex justify-between"}>
              <Htag type={"h2"}>phone:</Htag>
              <Htag type={"h2"} className={"text-end"}>
                {user.phone}
              </Htag>
            </div>
            <div className={"flex justify-between"}>
              <Htag type={"h2"}>email:</Htag>
              <Htag type={"h2"} className={"text-end"}>
                {user.email}
              </Htag>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
export default Profile;
