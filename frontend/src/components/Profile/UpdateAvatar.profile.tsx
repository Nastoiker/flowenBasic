import { Input } from "../../ui/input";
import { useAppSelector } from "../../store";
import { ProfileImage } from "../../helper/convertImagePath";
import { userState } from "../../store/slices/user.slice";
import { DOMEN } from "../../../domen.api";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Htag } from "../Htag/Htag";
import { ReactComponent as UploadedIcon } from "./Uploaded.svg";
import axios from "axios";
export const UpdateAvatarProfile = () => {
  const user = useAppSelector<userState>((state) => state.user.user!);
  const [error, setError] = useState<string>();
  const [file, setFile] = useState<File>();
  const [onDrag, setOnDrag] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>();
  let image = '';
  if (user.avatar && user.avatar?.length > 0) {
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
  };
  const uploadedFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
  };
  const onDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
    uploadedFile(file);
    setOnDrag(true);
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (!file) {
      console.log(1);
      return;
    }
    // formData.set('files', file);
    const formFile = { files: file };
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        DOMEN.user.updateAvatar,
        { ...formFile },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );
      await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
      const data = await res.data;
    } catch (e) {
      if(e instanceof  Error) {
        setError(e.message);
      }
    }
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();

    setOnDrag(false);
  };
  return (
    <>
      <Htag type={"h1"}>Ваша аватарка </Htag>
      <form onSubmit={(e) => onSubmit(e)} className="text-center">
        <div
          onDrop={onDrop}
          className="w-full mx-auto"
          onDragOver={handleDragOver}
        >
          {onDrag ? (
            <div className=" scale-75 bg-sky-700 shadow-xl  bg-blue transition-all duration-300 h-96">
              {" "}
              <div className="mx-auto">
                {" "}
                <UploadedIcon />
              </div>
            </div>
          ) : (
            <div className="h-96 ">
              {" "}
              <UploadedIcon />{" "}
            </div>
          )}
        </div>
        <Button type="submit">Изменить фото</Button>
      </form>
      {image ? (
        <div className={"bg-white"}>
          <div id="imagePreview" className={`bg-[url('${image}')]`}></div>
          <img src={image} alt="Preview" />
        </div>
      ) : (
        <div className={"bg-white"}>
          <img src="" alt="" />
        </div>
      )}

      <div className="avatar-preview">
        <img src={selectedFile} alt="Preview" />
      </div>
    </>
  );
};
