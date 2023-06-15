import { Htag } from "../Htag/Htag";
import { CommentProps } from "./Comment.props";
import { Paragraph } from "../Paragraph/Paragraph";
import { useEffect, useState } from "react";
import { setCurrentModel } from "../../store/slices/phones.slices";
import { Profile } from "../../../interfaces/product.interfaces";
import { ru } from "date-fns/locale";
import { format, addMonths } from "date-fns";
import { convertDate } from "../../helper/convertDate";
import { CommentImage, ProfileImage } from "../../helper/convertImagePath";
import { ImageModal } from "../ImageModal/ImageModal";
import { Stars } from "../Product/Phone/Stars";
import {DOMEN} from "../../../domen.api";
export const Comment = ({
  userId,
  images,
  comment,
  title,
  model,
  date,
}: CommentProps): JSX.Element => {
  const [user, setUser] = useState<Profile>();
  console.log(images);
  if (images) {
    const image = CommentImage(userId, images[0], model);
  }
  const [loading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      const res = await fetch(DOMEN.users.acc + userId);
      const user = await res.json();
      await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
      if (!user) {
        return;
      } else {
        setUser(user);
        setIsLoading(true);
      }
    })();
  }, []);
  const res = model.rating.find((r) => r.writtenById === userId);
  console.log(res);
  const rating = res?.number;
  if (!user) return <div></div>;
  const avatar = ProfileImage(user as any);
  const dateformat = convertDate(date);
  return (
    <div className={"p-5 bg-white shadow-md m-2 h-52 rounded-3xl"}>
      <div>
        <div className={"flex justify-between"}>
          <div className={"flex space-x-4"}>
            {user.avatar ? (
              <img
                src={avatar}
                height={30}
                className="rounded-full object-contain w-16 h-16"
                alt="avatar"
              />
            ) : (
              <img src={"icon"} className="rounded-full" alt="avatar" />
            )}

            <div>
              <Htag type={"h3"}>{user.login}</Htag>
              <div className={"flex space-x-2 my-2s"}>
                {rating && <Stars rating={rating} />}
                <Htag type={"h3"}>{rating}</Htag>
              </div>
            </div>
          </div>

          <span className={"text-gray-200"}>{dateformat}</span>
        </div>
        <div className="mt-2">
          <Htag type={"h2"}>{title}</Htag>
          <Paragraph className={"ml-2"} type={"medium"}>
            {comment}
          </Paragraph>
        </div>
      </div>

      {images!.length > 0 ? (
        images!.map((i) => {
          const image = CommentImage(userId, i, model);
          console.log(image);
          const check = image.split("/");
          if (check[check.length - 1] === "") {
            return <div></div>;
          }
          return (
            <ImageModal
              img={image}
              className={"rounded-md h-16 object-contain"}
            />
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
};
