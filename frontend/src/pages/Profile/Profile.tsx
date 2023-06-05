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
function Profile() {
  const user = useAppSelector<userState>((state) => state.user.user);
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
  return (
    <ProfileLayout>
      <div className={"mx-5 bg-white p-5 space-y-5 sm:p-10 rounded-3xl"}>
        <Htag type={"h1"}>Ваш профиль</Htag>
        <div className={"mx-auto sm:flex justify-between"}>
          <img
            src={avatar.length>0 ? avatar : "../../../public/icons/profile.svg"}
            className={"rounded-full h-24 w-24"}
            alt=""
          />
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
