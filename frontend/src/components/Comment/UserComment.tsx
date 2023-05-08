import { UserCommentProps } from "./UserComment.props";

export const UserComment = ({
  productId,
  images,
  user,
  title,
  date,
  description,
}: UserCommentProps) => {
  const commentImage = images.split(",");
  return (
    <div>
      <img src="" alt="" />
    </div>
  );
};
